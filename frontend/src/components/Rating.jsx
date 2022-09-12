import React from 'react';

const totalStars = 5;

const Rating = ({ rating = 0, reviews = 0, color = '#b9ae10' }) => {
  const ratingArr = rating.toString().split('.');
  const ratedStars = +ratingArr[0];
  const halfStars = ratingArr.length > 1 ? 1 : 0;
  const emptyStars = totalStars - (ratedStars + halfStars);
  return (
    <div title={`Rating: ${rating}`}>
      {Array(ratedStars)
        .fill(1)
        .map((_, index) => (
          <span key={index} style={{ color }} className="fas fa-star"></span>
        ))}
      {halfStars > 0 && <span style={{ color }} className="fas fa-star-half-alt"></span>}
      {Array(emptyStars)
        .fill(1)
        .map((_, index) => (
          <span key={index} style={{ color }} className="far fa-star"></span>
        ))}
      <span> / {reviews} reviews</span>
    </div>
  );
};

export default Rating;
