import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  const showMsg = (user) => {
    return (
      <>
        <div>{user.text}</div>
      </>
    );
  };

  return (
    <div className={`d-flex p-2 align-items-center justify-content-between  w-100 ${border}  `}>
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center"
          style={{ textDecoration: 'none' }}
        >
          <Avatar src={user.avatar} size="big-avatar" />

          <div style={{ transform: 'translateY(-2px)', marginLeft: '7px' }}>
            <span className="fullname">{user.fullname}</span>

            <small className="username d-block">{msg ? showMsg(user) : <>@{user.username}</>}</small>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
