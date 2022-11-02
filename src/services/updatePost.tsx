import axios from 'axios'
import { IPost, INewComment } from '../consts/Interface'

export const updatePostWithLike = async (post: IPost, id: number) => {
    const json = {
        "likeCount":  post.likeCount,
        "commentCount": post.commentCount,
        "retweetCount": post.retweetCount
    }

    try {
        const res = await axios.put(`https://localhost:7227/posts/${id}`, json)
        console.log("posted", res.data)
    } catch (err) {
    console.log(err)
    }
}

export const updatePostWithRetweet = async (post: IPost, id: number) => {
    const json = {
            "likeCount":  post.likeCount,
            "commentCount": post.commentCount,
            "retweetCount": post.retweetCount
            }
    try {
        const res = await axios.put(`https://localhost:7227/posts/${id}`, json)
        console.log("posted", res.data)
    } catch (err) {
    console.log(err)
    }
}

export const updatePostWithComment = async (post: IPost, newComment: INewComment ) => {
    
    const json = {
        "likeCount":  post.likeCount,
        "commentCount": post.commentCount +1,
        "retweetCount": post.retweetCount
        }

    const newCommentJson = {
        "postId": post.id,
        "userAt": newComment.userAt,
        "userName": newComment.userName,
        "userImg": newComment.userImg,
        "commentBody": newComment.commentBody,
        "commentMedia": newComment.commentMedia
      }

    console.log(newCommentJson)
    try {
        const res = await axios.put(`https://localhost:7227/posts/${post.id}`, json)
        console.log("posted", res.data)
    } catch (err) {
    console.log(err)
    }

    try {
        const res = await axios.post(`https://localhost:7227/comments`, newCommentJson)
        console.log("posted", res.data)
    } catch (err) {
    console.log(err)
    }
}