import React, { useState, useCallback, useEffect, useRef } from 'react'
import  { Post } from '../components/Post/Post'
import { CreatePost } from '../components/NewPost/CreatePost/CreatePost'
import { postPost } from '../services/postPost'
import { useGetPosts} from '../hooks/useGetPosts'
import { nanoid } from 'nanoid'
import { IPost } from '../consts/Interface'

export const HomePage: React.FC = () => {

    const loader = useRef(null);
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const { loading, error, posts, hasMore, setPosts } = useGetPosts(query, page)
    const [newPost, setNewPost] = useState({
    postTextBody: '',
    postMedia: '',
    userAt: 'BLAD33',
    userName: 'bladee',
    userImg: "https://i1.sndcdn.com/artworks-z7ABLFRxBZUd1j0w-ANNyqw-t500x500.jpg"
    }) 

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setPage(prevPage => prevPage +1)
       }
      }, [hasMore]);
    
      useEffect(() => {
        const option = {
          root: null,
          rootMargin: "20px",
          threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
      }, [handleObserver]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {  
        setNewPost(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value 
        }))
    }

    const handleTweet = () => {
        postPost(newPost)
    }

    const postsList = () => {
        if (typeof (posts) !== 'undefined') {
        return posts.map(post => {
  
    return (
        <div>
            <Post
                post={post}
                key={nanoid()}
                id={post.id}
                userName={post.userName}
                userAt={post.userAt}
                userImg={post.userImg}
                postTextBody={post.postTextBody}
                postMedia={post.postMedia}
                postDate={post.postDate}
                commentCount={post.commentCount}
                likeCount={post.likeCount}
                retweetCount={post.retweetCount}/>
            </div>      
        )
    })}}

        return (
            <div  className='ml-20'>
                <h1 className='pl-5 pt-3 pb-3 fixed w-full
                        backdrop-blur-lg font-bold bg-slate-400 
                        bg-opacity-5 font'>Home</h1>
                <div className='container-fluid pt-20 pl-5'>
                    <CreatePost 
                    newPost={{
                        postTextBody:'',
                        postMedia: '' }}
                    handleTweet={handleTweet}
                    handleChange={handleChange}
                    setNewPost={setNewPost}/>
                <div>
                    {postsList()}
                </div>
                </div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error!</p>}
                <div ref={loader} />
            </div>
        )
    }