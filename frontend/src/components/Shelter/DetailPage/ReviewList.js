import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetchGet from "../../../utils/useFetch";



const Reviews = ({shelter}) => {
  const [reviews, setReviews] = useState([]);
  const [hiddenReviews, setHiddenReviews] = useState([]);
  console.log(shelter);
  const {data, isLoading, error} = useFetchGet(`comments/shelter/${shelter.id}/comments/`);

  const [ hasMorePage, setHasMorePage ] = useState(true);

  const reviewPerPage = 5;

  useEffect(() => {
    if (data && !isLoading) {
      setReviews(data.results.slice(0, reviewPerPage));
      setHiddenReviews(data.results.slice(reviewPerPage));

      if (data.results.slice(reviewPerPage) === 0) {
        setHasMorePage(false);
      }
    }
  }, [data, isLoading]);

  
  const handleLoadMore = () => {
    if (hiddenReviews.length > 0) {
      const nextItems = hiddenReviews.slice(0, reviewPerPage);
      setHiddenReviews(hiddenReviews.slice(reviewPerPage));
      setReviews(prev => [...prev, ...nextItems]);
    } else {
      setHasMorePage(false);
    }
  }

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow duration-300 hover:bg-gray-100 hover:shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <p>{review.message}</p>
          <small>- {review.sender_name}</small>
        </div>
      ))}

      <div className="flex justify-center items-center">
      {hasMorePage ? <div className="text-slate-600 underline" onClick={handleLoadMore}> Load more </div>
       : null}
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
