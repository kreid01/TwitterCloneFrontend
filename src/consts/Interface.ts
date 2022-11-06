export type IPost = {
  id: number;
  userName: string | undefined;
  userAt: string | undefined;
  userImg: string | undefined;
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
  id: number;
  userAt: string | undefined;
  userName: string | undefined;
  userImg: string | undefined;
  commentBody: string;
  commentMedia?: string;
  commentDate: string;
};

export type INewComment = {
  commentBody: string;
  commentMedia: string;
  userAt: string | undefined;
  userName: string | undefined;
  userImg: string | undefined;
};

export type INewPost = {
  postTextBody: string;
  postMedia: string;
  userAt: string | undefined;
  userName: string | undefined;
  userImg: string | undefined;
};

export type IUser = {
  userId: number;
  userName: string;
  userAt: string;
  userImg: string;
  userCoverImg: string;
  userEmail: string;
  joinDate: string;
  followers: Array<number>;
  following: Array<number>;
  isAdmin?: boolean;
  userPassword?: string;
} | null;
