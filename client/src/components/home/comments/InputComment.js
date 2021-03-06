import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../redux/actions/commentAction';
import Icons from '../../Icons';
import UserImg from './UserInput';

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('');
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent('');

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));

    if (setOnReply) return setOnReply(false);
  };
  return (
    <form
      className="card-footer comment_input"
      onSubmit={handleSubmit}
      style={{ border: 'none', borderRadius: '10px' }}
    >
      {children}
      {!setOnReply && <UserImg user={auth.user} />}

      <input
        type="text"
        placeholder="Viết bình luận..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ border: 'none', borderRadius: '50px', padding: '6px 10px', backgroundColor: '#F0F2F5' }}
      />

      <Icons setContent={setContent} content={content} />
    </form>
  );
};

export default InputComment;
