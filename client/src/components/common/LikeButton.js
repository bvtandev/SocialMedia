import React from 'react';
import { useSelector } from 'react-redux';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <i className="fas fa-heart text-danger" onClick={handleUnLike} />
      ) : (
        <i className="far fa-heart" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
