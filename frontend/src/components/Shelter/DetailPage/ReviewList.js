import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetchGet from "../../../utils/useFetch";
import Rating from '@mui/material/Rating';
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { getUser } from "../../../utils/credential";

const Review = ({review}) => {
  console.log(review);
  return (
    <div className="p-4 text-base md:text-lg border-gray-200 border-b-2">
      {review.rating && <div><Rating value={review.rating} readOnly/></div>}
      <p>{review.message}</p>
      <h1 className="text-sm md:text-base text-right">{review.sender_name}</h1>
    </div>
  )
 
}

const Reviews = ({shelter}) => {
  const [reviews, setReviews] = useState([]);
  // const [hiddenReviews, setHiddenReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(null);
  
  const [nextUrl, setNextUrl] = useState(null);
  const [ hasMorePage, setHasMorePage ] = useState(false);

  const [posted, setPosted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // const {data, isLoading, error} = useFetchGet(
  //   `comments/shelter/${shelter.id}/comments/?page_size=10&page=1`
  // );

  useEffect(() => {
    fetch(`https://petpal.api.jimschenchen.com/comments/shelter/${shelter.id}/comments`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUser().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setReviews(data.results);
      if (data.next) {
        setNextUrl(data.next);
        setHasMorePage(true);
      }
      else {
        setNextUrl(null);
        setHasMorePage(false);
      }

      setIsLoading(false);
    });
  }, [posted]);

  const loadMore = () => {
    fetch(nextUrl, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUser().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setReviews(prev => [...prev, ...data.results]);
      if (data.next) {
        setNextUrl(data.next);
        setHasMorePage(true);
      }
      else {
        setNextUrl(null);
        setHasMorePage(false);
      }
    });
  }

  // const StarRating = ({index}) => {
  //   return (
  //     <button onClick={() => setRating(index)} className="text-yellow-300">
  //     {rating >= index? 
  //     <StarIcon fontSize="large" color="inherit"/>
  //     :<StarBorderIcon fontSize="large" color="inherit"/>}
  //   </button>
  //   )
  // }

  const handlePost = () => {
    if (message === '') {
      setError('Comment cannot be empty');
      return;
    }

    setIsPosting(true);

    fetch(`https://petpal.api.jimschenchen.com/comments/shelter/${shelter.id}/comments/`,
    {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUser().token}`
      },
      body: JSON.stringify({
        message: message,
        rating: rating
      })
    })
    .then(res => {
      if(res.ok) {
        setRating(null);
        setMessage('');
        setPosted(true);
        setIsPosting(false);
      }
    })
  }


  return (
    <>
    <div className="flex flex-col gap-3 p-4 border-gray-200 border-b-2">
      <h1 className="text-lg text-left">Add your review</h1>
      <div className="w-full gap-3 flex-col flex justify-center
      md:w-1/2 md:justify-start md:items-start">
      
      
      <div className="flex flex-col gap-3">
      <Rating 
      value={rating}
      size="large"
      onChange={(event, newValue) => {
        setRating(newValue);
      }}/>
      </div>
      <textarea defaultValue={''} value={message} placeholder="Leave your comment here" name="comment" id="comment" cols="30" 
      className="border-2 border-black w-full p-2 rounded-lg"
      onChange={(e) => {setMessage(e.target.value)}}/>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex justify-center">
        <button 
        className="h-8 rounded font-sans hover:font-bold bg-shelter text-white py-2 w-full 
        md:w-fit md:px-8"
        onClick={handlePost}>
          {isPosting? <CircularProgress color="inherit" size="1rem"/>: "Post"}
        </button>
      </div>
      </div>
      
    </div>

    {isLoading && 
    <div className="h-fit flex justify-center w-full overflow-hidden mt-3">
      <CircularProgress color="inherit"/></div>}

    {!isLoading && 
    <>
    <div className="flex flex-col gap-2 p-4 border-gray-200 border-b-2">
      <h1 className="text-lg text-left">Average rating</h1>
      <div><Rating value={shelter.average_rating} precision={0.1} size="large" readOnly/></div>
    </div>

    <div className="h-screen">
    <InfiniteScroll
    dataLength={reviews.length}
    next={loadMore}
    hasMore={hasMorePage}
    scrollableTarget='scrollTarget'
    loader={<div className="h-fit flex justify-center w-full overflow-hidden mt-3"><CircularProgress color="inherit"/></div>}
    endMessage={<></>}
    >
    {reviews.map((review) => (
        <Review key={review.id} review={review}/>
      ))}
    </InfiniteScroll>
    </div>
    </>}
    
    

      {/* <div className="flex justify-center items-center">
      {hasMorePage ? <div className="text-slate-600 underline" onClick={handleLoadMore}> Load more </div>
       : null}
      </div> */}
    </>
      
  );
};

export default Reviews;
