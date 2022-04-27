import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Send from '../../../assets/images/send.svg';
import LikeButton from '../../common/LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction';
import ShareModal from '../../common/ShareModal';
import { BASE_URL } from '../../../utils/config';

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  // Saved
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <div className="card_footer">
      <div
        className="d-flex justify-content-between "
        style={{ borderBottom: '0.5px solid rgb(216,216,216)' }}
      >
        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>{post.likes.length} Thích</h6>

        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>{post.comments.length} Bình luận</h6>
      </div>
      <div className="card_icon_menu" style={{ borderBottom: '0.5px solid rgb(216,216,216) ' }}>
        <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />

        {/* <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link>

          <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} /> */}

        <div className="postBottomActionItem">
          <div
            className="postBottomActionItemBg "
            style={{
              backgroundImage: `url("../../../assets/feed/infoImg.png")`,
              backgroundPosition: '0 -175px',
            }}
          ></div>

          <Link to={`/post/${post._id}`} className="postBottomActionItemText text-dark">
            Bình luận
          </Link>
        </div>
        <div className="postBottomActionItem">
          <div
            className="postBottomActionItemBg "
            style={{
              backgroundImage: `url("../../../assets/feed/infoImg.png")`,
              backgroundPosition: '0 -232px',
            }}
          ></div>
          <span className="postBottomActionItemText" onClick={() => setIsShare(!isShare)}>
            Chia sẻ
          </span>
        </div>

        {saved ? (
          <i className="fas fa-bookmark text-info" onClick={handleUnSavePost} />
        ) : (
          <i className="far fa-bookmark" onClick={handleSavePost} />
        )}
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
};

export default CardFooter;
