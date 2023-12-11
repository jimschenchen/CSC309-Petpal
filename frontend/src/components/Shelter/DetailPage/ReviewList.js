import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetchGet from "../../../utils/useFetch";
import Rating from '@mui/material/Rating';
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { getUser } from "../../../utils/credential";

import StarIcon from '@mui/icons-material/Star';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  const navigate = useNavigate();

  const [reviewsMeta, setReviewsMeta] = useState({
    "total_comments_count": 0,
    "not_null_comments_count": 0,
    "rating_1_count": 0,
    "rating_2_count": 0,
    "rating_3_count": 0,
    "rating_4_count": 0,
    "rating_5_count": 0
});


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


  useEffect(() => {
    // load meta
    fetch(`https://petpal.api.jimschenchen.com/comments/shelter/${shelter.id}/comments/meta/`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUser().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setReviewsMeta(data);
    })

  }, []);

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

    if (getUser().userType === 'guest') {
      navigate('/auth/login');
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


  const theme = createTheme({
    palette: {
      star: {
        main: '#fbbc04',
      },
    },
  });

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
    null: 'No Review'
  };


  function LinearProgressWithLabel(props) {

    const { id, meta } = props;
    const cur_count = meta[`rating_${id}_count`];
    const progressValue = cur_count / meta.not_null_comments_count * 100;

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ minWidth: 25 }}>
            <Typography variant="body2" color="text.secondary">{ id }</Typography>
          </Box>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" color="star" value={ progressValue } />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              cur_count
            )}`}</Typography>
          </Box>
        </Box>
      </ThemeProvider>

    );
  }

  const calculateAverage = (meta) => {
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
      sum += i * meta[`rating_${i}_count`];
    }
    return sum / meta.not_null_comments_count;
  }

  return (
    <>
    <div className="flex flex-col md:flex-row w-full">
    <div className="md:w-1/2 flex flex-col gap-2 p-4 border-gray-200 border-b-2
    md:border-r-2">
      <h1 className="text-lg text-left">Rating Review</h1>
      {/* <div className="flex items-center justify-center gap-2">
        <div >{Math.round(shelter.average_rating*10)/10}</div>
      <div className="w-fit"><Rating value={shelter.average_rating} precision={0.1} size="large" readOnly/></div>
      </div> */}

      <div className="flex max-w-lg m-4">
        <div className="basis-3/4">
          <LinearProgressWithLabel meta={reviewsMeta} id={5} className="flex-initial"/>
          <LinearProgressWithLabel meta={reviewsMeta} id={4} className="flex-initial"/>
          <LinearProgressWithLabel meta={reviewsMeta} id={3} className="flex-initial"/>
          <LinearProgressWithLabel meta={reviewsMeta} id={2} className="flex-initial"/>
          <LinearProgressWithLabel meta={reviewsMeta} id={1} className="flex-initial"/>
        </div>
        <div className="basis-1/4 flex flex-col items-center">
          <div className="text-5xl">
            {calculateAverage(reviewsMeta).toFixed(1)}
          </div>

          <div className="pl-0 mt-2 flex justify-start items-center gap-2">
            <Rating
              className=""
              name="read-only"
              size="small"
              value={calculateAverage(reviewsMeta).toFixed(1)}
              readOnly
              precision={0.1}
              emptyIcon={
                <StarIcon style={{ opacity: 1 }} fontSize="inherit" />
              }
            />
          </div>

          <div className="text-sm">
            {reviewsMeta.total_comments_count} reviews
          </div>
        </div>
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
