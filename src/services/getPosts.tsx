import axios from 'axios'

export const getPosts = async () => {

     type Posts = {
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
    
    type GetPostsResponse = {
        data: Posts[]
    }

    try {
        const {data, status} = await axios.get<GetPostsResponse>('https://localhost:7227/posts?PageNumber=1&PageSize=10')
        console.log("posted", data, status)
        return data 
    } catch (err) {
    console.log(err)
    }
}