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
    
    const commentJson = []
    
   if(post.comments !== null) post.comments.map(comment => {
         commentJson.push(
        {
            "userAt": comment.UserAt,
            "userName": comment.UserName,
            "userImg": comment.UserImg,
            "commentBody": comment.CommentBody
        })
    })

    commentJson.push({
        "userAt": newComment.userAt,
        "userName": newComment.userName,
        "userImg": newComment.userImg,
        "commentBody": newComment.commentBody
    })

    const json = {
            "commentCount": post.commentCount+1,
            "comments": commentJson
    }
    console.log(json)
    try {
        const res = await axios.put(`https://localhost:7227/posts/comments/${post.id}`, json)
        console.log("posted", res.data)
    } catch (err) {
    console.log(err)
    }
}