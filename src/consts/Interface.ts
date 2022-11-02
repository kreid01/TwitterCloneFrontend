export type IPost = {
  id: number;
  userName: string;
  userAt: string;
  userImg: string;
  postTextBody: string;
  postMedia: string;
  postDate: string;
  commentCount: number;
  likeCount: number;
  retweetCount: number;
  isLiked?: boolean;
  isRetweeted?: boolean;
  comments?: Array<Comment>;
  posterId?: number;
  likedBy?: number[];
  retweetedBy?: number[];
};

export type IComment = {
  userAt: string;
  userName: string;
  userImg: string;
  commentBody: string;
  commentMedia?: string;
  commentDate: string;
};

export type INewComment = {
  commentBody: string;
  commentMedia: string;
  userAt: string;
  userName: string;
  userImg: string;
};

export type INewPost = {
  postTextBody: string;
  postMedia: string;
  userAt: string;
  userName: string;
  userImg: string;
};
