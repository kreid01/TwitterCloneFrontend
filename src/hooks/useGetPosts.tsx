import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useGetPosts = (query: string, page: number) => {

    type Post = {
        id:number,
        userName:string
        userAt:string
        userImg:string,
        postTextBody:string
        postMedia:string
        postDate:string
        commentCount:number
        likeCount:number
        retweetCount:number
    }
     
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [posts, setPosts] = useState<Post[]>()
    const [hasMore, setHasMore] = useState(false)

    const sendQuery  = useCallback(async (query: string)  => {
        try {
            await setLoading(true)
            await setError(false)
            const {data} = await axios.get<Post[]>(`https://localhost:7227/posts?PageNumber=${page}&PageSize=3`)
            await setPosts(prevData => (prevData !== undefined) ? [...prevData, ...data] : [])
            await setHasMore(data.length > 1)
            console.log(data)
            console.log(hasMore)
        } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
        }
    }, [query, page])

    useEffect(() => {
        sendQuery(query)
    }, [query, sendQuery, page])
    return { loading, error, posts, hasMore, setPosts}
}   