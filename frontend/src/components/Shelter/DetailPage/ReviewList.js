import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetchGet from "../../../utils/useFetch";
import Rating from '@mui/material/Rating';
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { getUser } from "../../../utils/credential";

const Review = ({review}) => {
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

  const [avg_rating, setAvgRating] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(null);
  
  const [nextUrl, setNextUrl] = useState(null);
  const [ hasMorePage, setHasMorePage ] = useState(false);

  const [posted, setPosted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);


  useEffect(() => {
    fetch(`https://petpal.api.jimschenchen.com/comments/shelter/${shelter.id}/comments?page=1&page_size=10`, {
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

      return fetch(`https://petpal.api.jimschenchen.com/accounts/shelters/${shelter.id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getUser().token}`
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      setAvgRating(data.average_rating)
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
        setPosted(prev => !prev);
        setIsPosting(false);
      }
    })
  }

  return (
    <>
    <div className="flex flex-col md:flex-row w-full">
    <div className="md:w-1/2 flex flex-col gap-2 p-4 border-gray-200 border-b-2
    md:border-r-2">
      <h1 className="text-lg text-left">Average rating</h1>
      <div className="flex items-center justify-center gap-2">
        <div >{Math.round(shelter.average_rating*10)/10}</div>
      <div className="w-fit"><Rating value={shelter.average_rating} precision={0.1} size="large" readOnly/></div>
      </div>
    </div>

    <div className="md:w-1/2 flex flex-col gap-3 p-4 border-gray-200 border-b-2">
      <h1 className="text-lg text-left">Add your review</h1>
      <div className="w-full gap-3 flex-col flex justify-center">
      
      
      <div className="flex flex-col gap-3">
      <div>
      <Rating 
      value={rating}
      size="large"
      onChange={(event, newValue) => {
        setRating(newValue);
      }}/>
      </div>
      
      </div>
      <textarea value={message} placeholder="Leave your comment here" name="comment" id="comment" cols="30" 
      className="border-2 border-black w-full p-2 rounded-lg"
      onChange={(e) => {setError(''); setMessage(e.target.value)}}/>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex justify-center">
        <button 
        className="h-8 rounded font-sans hover:font-bold bg-shelter text-white py-2 w-full"
        onClick={handlePost}>
          {isPosting? <CircularProgress color="inherit" size="1rem"/>: "Post"}
        </button>
      </div>
      </div>
      
    </div>
    </div>
    

    {isLoading && 
    <div className="h-fit flex justify-center w-full overflow-hidden mt-3">
      <CircularProgress color="inherit"/></div>}

    {!isLoading && 
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
    </div>}
    
    

      {/* <div className="flex justify-center items-center">
      {hasMorePage ? <div className="text-slate-600 underline" onClick={handleLoadMore}> Load more </div>
       : null}
      </div> */}
    </>
      
  );
};

export default Reviews;
