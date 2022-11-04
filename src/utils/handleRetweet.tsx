import { IPost } from "consts/Interface";
import { updatePost } from "services/updatePost";

export const handleRetweet = (
  posts: IPost[],
  index: number,
  setter: (setterArr: IPost[]) => void
) => {
  const newArr = [...(posts as Array<IPost>)];
  const updatedRetweetedByArr = updatePostRetwteetedBy(newArr, index);
  const updatedRetweetCountArr = updatePostsRetweetCount(
    updatedRetweetedByArr,
    index
  );
  setter(updatedRetweetCountArr);
  updatePost(posts[index]);
};

const updatePostRetwteetedBy = (newArr: IPost[], index: number) => {
  if (newArr[index].retweetedBy?.includes(1)) {
    let indexOfUser = newArr[index].retweetedBy?.indexOf(1);
    newArr[index].retweetedBy?.splice(indexOfUser as number, 1);
  } else {
    newArr[index].retweetedBy = [
      ...(newArr[index].retweetedBy as Array<number>),
      1,
    ];
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
