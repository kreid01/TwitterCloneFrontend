export const testPost = {
  id: 1,
  userName: "test-name",
  userAt: "testAt",
  userImg: "testImg",
  postTextBody: "testBody",
  postMedia: "test-media",
  postDate: "testDate",
  commentCount: 1,
  likeCount: 1,
  retweetCount: 1,
  isRetweeted: false,
  isLiked: false,
  retweetedBy: [1],
  comments: [],
};

export const testComment = {
  id: 1,
  userName: "test-name",
  userAt: "testAt",
  userImg: "testImg",
  commentBody: "testBody",
  commentMedia: "test-media",
  commentDate: "test-date",
};
export const testPosts = [testPost, testPost];

export const testUser = {
  userId: 1,
  userName: "test-name",
  userAt: "testAt",
  userImg: "testImg",
  userCoverImg: "testCoverImg",
  userEmail: "testEmail",
  postsIds: [1, 2],
  joinDate: "testDate",
  following: [1, 2],
  followers: [1, 2],
  email: "",
  password: "",
};
