import ImageSlider from '@components/slider/ImageSlider';
import Text from '@components/ui/Text';
import CommentCard from '@components/card/CommentCard';
import { Post } from '@type/api/post';
import { Camp } from '@type/api/camp';
import { Comment } from '@type/api/comment';
import InputComment from '@components/input/InputComment';
import PostConentCard from '@components/card/PostConentCard';
import Hr from '@components/ui/Hr';

interface PostModalTemplateProps {
  camp: Camp;
  post: Post;
  isLike: boolean;
  comments: Comment[];
  inputComment: string;
  setInputComment: React.Dispatch<React.SetStateAction<string>>;
  handlePostModalClose: () => void;
  handleCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleLike: () => void;
  commentStatus: {
    isError: boolean;
    isPending: boolean;
  };
  scrollRef: React.RefObject<HTMLDivElement>;
}

function PostModalTemplate({
  camp,
  post,
  isLike,
  comments,
  inputComment,
  setInputComment,
  handlePostModalClose,
  handleCommentSubmit,
  handleLike,
  commentStatus,
  scrollRef,
}: PostModalTemplateProps) {
  return (
    <div className="flex h-[31.25rem] border-sm border-text-primary">
      {post.url.length !== 0 && (
        <div className="w-[37.5rem]">
          <ImageSlider
            width={37.5}
            images={post.url.map((url) => url.fileUrl)}
          />
        </div>
      )}
      <div
        className={`flex w-[17.5rem] flex-col justify-between ${
          post.url.length !== 0 && 'border-l-sm border-text-primary'
        }`}
      >
        <div
          className="cool-scrollbar flex flex-col overflow-y-auto border-text-primary"
          ref={scrollRef}
        >
          <PostConentCard
            campName={camp.campName}
            content={post.content}
            createdAt={post.createdAt}
            handleLike={handleLike}
            handlePostModalClose={handlePostModalClose}
            isLike={isLike}
            likeCount={post.likeCount}
          />
          <Hr color="text-secondary">
            <Text size={12} color="point-blue">
              {post.commentCount}개의 코멘트
            </Text>
          </Hr>
          <ul className="flex flex-col gap-lg p-md">
            {comments.map((comment) => (
              <CommentCard
                comment={comment}
                key={`comment-${comment.commentId}`}
              />
            ))}
          </ul>
        </div>
        <InputComment
          comment={inputComment}
          setComment={setInputComment}
          handleCommentSubmit={handleCommentSubmit}
          status={commentStatus}
        />
      </div>
    </div>
  );
}

export default PostModalTemplate;
