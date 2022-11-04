import { IPost } from "consts/Interface";
import { updatePost } from "services/posts/updatePost";

export const handleRetweet = (
  posts: IPost[],
  index: number,
  setter: (setterArr: IPost[]) => void,
  userId: number
) => {
  const newArr = [...(posts as Array<IPost>)];
  const updatedRetweetedByArr = updatePostRetwteetedBy(newArr, index, userId);
  const updatedRetweetCountArr = updatePostsRetweetCount(
    updatedRetweetedByArr,
    index
  );
  setter(updatedRetweetCountArr);
  updatePost(posts[index]);
};

const updatePostRetwteetedBy = (
  newArr: IPost[],
  index: number,
  userId: number
) => {
  if (
    newArr[index].retweetedBy !== null &&
    newArr[index].retweetedBy?.includes(userId)
  ) {
    let indexOfUser = newArr[index].retweetedBy?.indexOf(userId);
    newArr[index].retweetedBy?.splice(indexOfUser as number, userId);
  } else if (newArr[index].retweetedBy !== null) {
    newArr[index].retweetedBy = [
      ...(newArr[index].retweetedBy as Array<number>),
      1,
    ];
  } else {
    newArr[index].retweetedBy = [userId];
  }
  return newArr;
};

const updatePostsRetweetCount = (newArr: IPost[], index: number) => {
  newArr[index].retweetCount = newArr[index].isLiked
    ? newArr[index].retweetCount - 1
    : newArr[index].retweetCount + 1;
  newArr[index].isRetweeted = !newArr[index].isRetweeted;
  return newArr;
};
