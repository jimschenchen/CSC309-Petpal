import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetchGet from "../../../utils/useFetch";

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Reviews = ({shelter}) => {
  const [reviews, setReviews] = useState([]);
  const [hiddenReviews, setHiddenReviews] = useState([]);
  const {data, isLoading, error} = useFetchGet(`comments/shelter/${shelter.id}/comments/`);

  const [ hasMorePage, setHasMorePage ] = useState(true);

  const [reviewsMeta, setReviewsMeta] = useState({
    1: {percentage: 0, count: 0,},
    2: {percentage: 0, count: 0,},
    3: {percentage: 0, count: 0,},
    4: {percentage: 0, count: 0,},
    5: {percentage: 0, count: 0,},
    average: 0,
    length: 0
  });

  const reviewPerPage = 5;

  useEffect(() => {
    if (data && !isLoading) {
      calcReviewMeta(data.results);
      setReviews(data.results.slice(0, reviewPerPage));
      setHiddenReviews(data.results.slice(reviewPerPage));

      if (data.results.slice(reviewPerPage) === 0) {
        setHasMorePage(false);
      }
    }
  }, [data, isLoading]);

  const calcReviewMeta = (reviews) => {
    const realReviews = reviews.filter(review => review.rating !== null);
    const meta = {
      1: {
        count: realReviews.filter(review => review.rating === 1).length,
        percentage: realReviews.filter(review => review.rating === 1).length / realReviews.length * 100
      },
      2: {
        count: realReviews.filter(review => review.rating === 2).length,
        percentage: realReviews.filter(review => review.rating === 2).length / realReviews.length * 100
      },
      3: {
        count: realReviews.filter(review => review.rating === 3).length,
        percentage: realReviews.filter(review => review.rating === 3).length / realReviews.length * 100
      },
      4: {
        count: realReviews.filter(review => review.rating === 4).length,
        percentage: realReviews.filter(review => review.rating === 4).length / realReviews.length * 100
      },
      5: {
        count: realReviews.filter(review => review.rating === 5).length,
        percentage: realReviews.filter(review => review.rating === 5).length / realReviews.length * 100
      },
      average: realReviews.reduce((acc, cur) => acc + cur.rating, 0) / realReviews.length,
      count: reviews.length
    }
    setReviewsMeta(meta)
    console.log(meta);
  }

  const handleLoadMore = () => {
    if (hiddenReviews.length > 0) {
      const nextItems = hiddenReviews.slice(0, reviewPerPage);
      setHiddenReviews(hiddenReviews.slice(reviewPerPage));
      setReviews(prev => [...prev, ...nextItems]);
    } else {
      setHasMorePage(false);
    }
  }

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


  const theme = createTheme({
    palette: {
      star: {
        main: '#fbbc04',
      },
    },
  });

  function LinearProgressWithLabel(props) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ minWidth: 25 }}>
            <Typography variant="body2" color="text.secondary">{props.title}</Typography>
          </Box>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" color="star" {...props} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.count
            )}`}</Typography>
          </Box>
        </Box>
      </ThemeProvider>

    );
  }


  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow duration-300 hover:bg-gray-100 hover:shadow-md">
      <h2 className="text-2xl font-bold mb-4">Review Summary</h2>

      <div className="flex max-w-lg mb-4">
        <div className="basis-3/4">
          <LinearProgressWithLabel value={reviewsMeta[5].percentage} count={reviewsMeta[5].count} title={5} className="flex-initial"/>
          <LinearProgressWithLabel value={reviewsMeta[4].percentage} count={reviewsMeta[4].count} title={4} className="flex-initial"/>
          <LinearProgressWithLabel value={reviewsMeta[3].percentage} count={reviewsMeta[3].count} title={3} className="flex-initial"/>
          <LinearProgressWithLabel value={reviewsMeta[2].percentage} count={reviewsMeta[2].count} title={2} className="flex-initial"/>
          <LinearProgressWithLabel value={reviewsMeta[1].percentage} count={reviewsMeta[1].count} title={1} className="flex-initial"/>
        </div>
        <div className="basis-1/4 flex flex-col items-center">
          <div className="text-5xl">
            {reviewsMeta.average.toFixed(1)}
          </div>

          <div className="pl-0 mt-2 flex justify-start items-center gap-2">
            <Rating
              className=""
              name="read-only"
              size="small"
              value={reviewsMeta.average.toFixed(1)}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 1 }} fontSize="inherit" />
              }
            />
            <p className="text-sm text-zinc-600">{labels[5]}</p>
          </div>

          <div className="text-sm">
            {reviewsMeta.count} reviews
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-4">Reviews</h2>

      {reviews.map((review) => (
        <div key={review.id} className="mb-4 flex flex-col">
          <div className="flex justify-start items-center gap-2">
            <Avatar sx={{ width: 28, height: 28 }}>
              {" "}
              <div> {review.sender_name.slice(0, 1).toUpperCase()} </div>
            </Avatar>
            <div> {review.sender_name}</div>
          </div>

          <div className="pl-0 mt-2 flex justify-start items-center gap-2">
            <Rating
              className=""
              name="read-only"
              size="small"
              value={review.rating}
              readOnly
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <p className="text-sm text-zinc-400">{labels[review.rating]}</p>
          </div>

          <p className="pl-1 pt-1">{review.message}</p>
        </div>
      ))}

      <div className="flex justify-center items-center">
        {hasMorePage ? (
          <div className="text-slate-600 underline" onClick={handleLoadMore}>
            {" "}
            Load more{" "}
          </div>
        ) : null}
      </div>

      <div className="flex justify-end mt-2">
        <div>
          <Link
            to={`/add_review/${shelter.id}`}
            className="rounded font-sans hover:font-bold bg-primary text-white px-3 py-2"
          >
            Add reviews
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Reviews;
