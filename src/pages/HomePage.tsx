import React, { useState, useCallback, useEffect, useRef } from 'react'
import  { Post } from '../components/Post'
import { CreatePost } from '../utils/CreatePost'
import { postPost } from '../services/postPost'
import { useGetPosts} from '../hooks/useGetPosts'
import  updatePostWithLike  from '../services/updatePost'
import { nanoid } from 'nanoid'

export const HomePage: React.FC = ({}) => {

    const loader = useRef(null);
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const { loading, error, posts, hasMore } = useGetPosts(query, page)
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

    const handleComment = () => {
    }

    const handleRetweet = () => {   
    }

    const handleLike = (id :number) => {
        updatePostWithLike(id)
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement> ) => {  
        setNewPost(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value 
        }))
        console.log(newPost)
    }

    const handleTweet = () => {
        postPost(newPost)
    }

    const postsList = () => {
        if (typeof (posts) !== 'undefined') {
        return posts.map((post, index) => {
  
    return (
        <div>
            <Post
                key={nanoid()}
                postData={posts} 
                id={post.id}
                userName={post.userName}
                userAt={post.userAt}
                userImg={post.userImg}
                postTextBody={post.postTextBody}
                postMediaBody={post.postMedia}
                postDate={post.postDate}
                commentCount={post.commentCount}
                likeCount={post.likeCount}
                retweetCount={post.retweetCount}
                handleComment={handleComment}
                handleRetweet={handleRetweet}
                handleLike={handleLike}/>
            </div>      
        )
    })}}

        return (
            <>
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
            </>
        )
    }