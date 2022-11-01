import React from 'react'
import { IconBaseProps } from 'react-icons';
import { FaComment, FaRetweet, FaHeart } from 'react-icons/fa'
import { IPost } from '../../consts/Interface'

interface Props {
    handleLike: (post: IPost, index: number) => void
    handleRetweet: (post: IPost,  index: number) => void
    handleComment: (post: IPost) => void
    index: number
    post: IPost
}

export const PostInteraction: React.FC<Props> = ({post, handleLike, handleComment, handleRetweet, index}) => {
    

    return (
        <>
        <div className='flex'>
            <PostInteractionIcon
            className='comment-icon' 
            icon={<FaComment  data-testid='commentButton' onClick={() => handleComment(post)}/>}/>
            <p className='mt-3.5 text-xs'>{post.commentCount}</p>
            <PostInteractionIcon 
            className='retweet-icon' 
            icon={<FaRetweet 
            style={{color: (post.isRetweeted) ? 'blue' : 'none'  }}     
            data-testid='retweetButton' 
            onClick={() => handleRetweet(post, index)}/>}/>
            <p className='mt-3.5 text-xs'>{post.retweetCount}</p>
            <PostInteractionIcon
            className='heart-icon' 
            icon={<FaHeart 
            style={{color: (post.isLiked) ? 'red' : 'none'  }}         
            data-testid='likeButton' 
             onClick={() => handleLike(post, index)}/>}/>
            <p className='mt-3.5 text-xs'>{post.likeCount}</p>
        </div>
        </>
    )
}


const PostInteractionIcon = ({ icon, className }: {icon: IconBaseProps, className: string})  => (
    <div className={className}>
        <>{icon}</>
    </div>
)