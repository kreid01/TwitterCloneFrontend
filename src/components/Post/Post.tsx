import React from 'react'
import { PostInteraction } from '../PostInteractions/PostInteraction'
import { IPost } from '../../consts/Interface'
import {Link} from 'react-router-dom'

interface Props {
    post: IPost
    index: number
    handleLike: (post: IPost, index: number) => void
    handleRetweet: (post: IPost,  index: number) => void
    handleComment: (post: IPost, index: number) => void
    setToCurrentPost: ( post: IPost ) => void
}

export const Post: React.FC<Props> = ({ post, handleLike, handleComment, handleRetweet, setToCurrentPost, index }) => {

    return (
        <div className='flex mt-5 mb-5' data-testid='post'>
            <img className='w-12 h-12 rounded-full' src={post.userImg} alt=''/>
            <div className='flex-col pl-4'>  
                    <p className=''><Link to={`/${post.userAt}`}><strong>{post.userName}</strong></Link>
                    <span className='text-gray-500'>@{post.userAt}·{post.postDate}</span></p>
                <p>{post.postTextBody}</p>
                <img 
                 onClick={() => setToCurrentPost(post)} 
                className='w-80 pt-2 max-h-72 rounded-xl'
                src={post.postMedia} alt='' data-testid='media'/>
                 <PostInteraction
                 index={index}
                 post={post} 
                 handleComment={handleComment}
                 handleLike={handleLike}
                 handleRetweet={handleRetweet}/> 
            </div>          
        </div>
    )
}