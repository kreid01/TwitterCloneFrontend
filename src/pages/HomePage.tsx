import React, { useState, useCallback, useEffect, useRef } from 'react'
import  { Post } from '../components/Post/Post'
import { CreatePost } from '../components/NewPost/CreatePost/CreatePost'
import { postPost } from '../services/postPost'
import { useGetPosts} from '../hooks/useGetPosts'
import { nanoid } from 'nanoid'
import { IPost } from '../consts/Interface'
import { updatePostWithLike, updatePostWithRetweet } from 'services/updatePost'

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

    const handleLike = (post: IPost, id: number, index: number) => {
        const newArr = [...posts as Array<IPost>]
        newArr[index].likeCount = (newArr[index].isLiked)  ? 
         newArr[index].likeCount - 1 : newArr[index].likeCount + 1
        newArr[index].isLiked = !newArr[index].isLiked
        setPosts(newArr)
        updatePostWithLike(post, id)
    }

    
    const handleRetweet = (post: IPost, id: number, index: number) => {  
        const newArr = [...posts as Array<IPost>]
        newArr[index].retweetCount = (newArr[index].isRetweeted)  ? 
         newArr[index].retweetCount - 1 : newArr[index].retweetCount + 1
        newArr[index].isRetweeted = !newArr[index].isRetweeted
        setPosts(newArr)
        updatePostWithRetweet(post, id)
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
                isLiked={post.isLiked}
                isRetweeted={post.isRetweeted}
                handleLike={handleLike}
                handleRetweet={handleRetweet}
                post={post}
                key={nanoid()}
                id={post.id}
                index={index}
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