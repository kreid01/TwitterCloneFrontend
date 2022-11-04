import axios from 'axios'

export const getPostInfo = async (id: number) => {

     type Post = {
        id:number,
        userName:string
        userAt:string
        userImg:string,
        postTextBody:string
        postMediaBody:string
        postDate:string
        commentCount:number
        likeCount:number
        retweetCount:number
    }

    try {
        const {data, status} = await axios.get<Post>(`https://localhost:7227/posts/${id}`)
        console.log("posted", data, status)
    } catch (err) {
    console.log(err)
    }
}