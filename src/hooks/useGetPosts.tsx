import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {IPost} from '../consts/Interface'

export const useGetPosts = (query: string, page: number) => {

    
     
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [posts, setPosts] = useState<IPost[]>()
    const [hasMore, setHasMore] = useState<boolean>(false)

    const sendQuery  = useCallback(async (query: string)  => {
        try {
            await setLoading(true)
            await setError(false)
            const {data} = await axios.get<IPost[]>(`https://localhost:7227/posts?PageNumber=${page}&PageSize=2`)
            await setPosts(prevData => (prevData !== undefined) ? [...prevData, ...data] : [])
            await setHasMore( await data.length > 1)
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