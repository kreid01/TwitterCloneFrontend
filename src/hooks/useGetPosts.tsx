import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useGetPosts = (query: string, page: number) => {

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
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [posts, setPosts] = useState<GetPostsResponse>()

    const sendQuery  = useCallback(async (query: string)  => {
        try {
            await setLoading(true)
            await setError(false)
            const {data, status} = await axios.get<GetPostsResponse>(`https://localhost:7227/posts?PageNumber=${page}&PageSize=1`)
            setPosts(data)
            setLoading(false)
        } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
        }
    }, [page, query])

    useEffect(() => {
        sendQuery(query)
    }, [query, sendQuery, page])
    return { loading, error, posts}
}   