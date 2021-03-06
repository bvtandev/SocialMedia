import CardBody from '../cards/CardBody';
import CardFooter from '../cards/CardFooter';
import CardHeader from '../cards/CardHeader';

import Comments from '../comments/Comments';
import InputComment from '../comments/InputComment';

const PostCard = ({ post }) => {
  return (
    <div className="card" style={{ margin: '16px 0 0 0' }}>
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
