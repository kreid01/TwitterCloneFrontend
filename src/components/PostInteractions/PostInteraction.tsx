import React from 'react'
import { IconBaseProps } from 'react-icons';
import { FaComment, FaRetweet, FaHeart } from 'react-icons/fa'
import { IPost } from '../../consts/Interface'

interface Props {
    handleLike: (post: IPost, id: number, index: number) => void
    handleRetweet: (post: IPost, id: number, index: number) => void
    handleComment: (post: IPost, id: number) => void
    likeCount: number
    retweetCount: number
    commentCount: number
    id: number
    index: number
    post: IPost
    isRetweeted: boolean
    isLiked: boolean
}

export const PostInteraction: React.FC<Props> = (props: Props) => {

    return (
        <>
        <div className='flex'>
            <PostInteractionIcon
            
            className='comment-icon' 
            icon={<FaComment  data-testid='commentButton' onClick={() => props.handleComment(props.post, props.id)}/>}/>
            <p className='mt-3.5 text-xs'>{props.commentCount}</p>
            <PostInteractionIcon 
            className='retweet-icon' 
            icon={<FaRetweet 
            style={{color: (props.isRetweeted) ? 'blue' : 'none'  }}     
            data-testid='retweetButton' 
            onClick={() => props.handleRetweet(props.post, props.id, props.index)}/>}/>
            <p className='mt-3.5 text-xs'>{props.retweetCount}</p>
            <PostInteractionIcon
            className='heart-icon' 
            icon={<FaHeart 
            style={{color: (props.isLiked) ? 'red' : 'none'  }}         
            data-testid='likeButton' 
             onClick={() => props.handleLike(props.post, props.id, props.index)}/>}/>
            <p className='mt-3.5 text-xs'>{props.likeCount}</p>
        </div>
        </>
    )
}


const PostInteractionIcon = ({ icon, className }: {icon: IconBaseProps, className: string})  => (
    <div className={className}>
        <>{icon}</>
    </div>
)