import PropTypes from "prop-types";
import { Fragment } from "react";

const StarRating = ({ rating }) => {
  // Tạo một mảng với 5 phần tử
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <Fragment key={index}>
        <i className={`${index < rating ? "fas" : "far"} fa-star`}></i>
      </Fragment>
    );
  });

  return <div>{stars}</div>;
};
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
