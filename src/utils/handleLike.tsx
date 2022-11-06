import { IPost } from "consts/Interface";
import { updatePost } from "services/posts/updatePost";

export const handleLike = (
  posts: IPost[],
  index: number,
  setter: (setterArr: IPost[]) => void,
  userId: number
) => {
  const newArr = [...(posts as Array<IPost>)];
  const updatedLikedByArr = updatePostLikedBy(newArr, index, userId);
  const updatedLikedCountArr = updatePostsLikeCount(updatedLikedByArr, index);
  setter(updatedLikedCountArr);
  console.log(posts[index]);
  updatePost(posts[index]);
};

const updatePostLikedBy = (newArr: IPost[], index: number, userId: number) => {
  if (
    newArr[index].likedBy !== null &&
    newArr[index].likedBy?.includes(userId)
  ) {
    let indexOfUser = newArr[index].likedBy?.indexOf(userId);
    newArr[index].likedBy?.splice(indexOfUser as number, 1);
  } else if (newArr[index].likedBy !== null) {
    newArr[index].likedBy = [
      ...(newArr[index].likedBy as Array<number>),
      userId,
    ];
  } else {
    newArr[index].likedBy = [userId];
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
