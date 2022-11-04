import { IPost } from "consts/Interface";
import { updatePost } from "services/updatePost";

export const handleLike = (
  posts: IPost[],
  index: number,
  setter: (setterArr: IPost[]) => void
) => {
  const newArr = [...(posts as Array<IPost>)];
  const updatedLikedByArr = updatePostLikedBy(newArr, index);
  const updatedLikedCountArr = updatePostsLikeCount(updatedLikedByArr, index);
  setter(updatedLikedCountArr);
  updatePost(posts[index]);
};

const updatePostLikedBy = (newArr: IPost[], index: number) => {
  if (newArr[index].likedBy?.includes(1)) {
    let indexOfUser = newArr[index].likedBy?.indexOf(1);
    newArr[index].likedBy?.splice(indexOfUser as number, 1);
  } else {
    newArr[index].likedBy = [...(newArr[index].likedBy as Array<number>), 1];
  }
  return newArr;
};

const updatePostsLikeCount = (newArr: IPost[], index: number) => {
  newArr[index].likeCount = newArr[index].isLiked
    ? newArr[index].likeCount - 1
    : newArr[index].likeCount + 1;
  newArr[index].isLiked = !newArr[index].isLiked;
  return newArr;
};
