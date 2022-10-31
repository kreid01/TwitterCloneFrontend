import axios from 'axios'
import { IPost } from '../consts/Interface'

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

export const updatePostWithComment = async (post: IPost, id: number) => {
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