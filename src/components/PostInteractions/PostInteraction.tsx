import React from 'react'
import { IconBaseProps } from 'react-icons';
import { FaComment, FaRetweet, FaHeart } from 'react-icons/fa'
import { IPost } from '../../consts/Interface'

interface Props {
    handleLike: (post: IPost, id: number) => void
    handleRetweet: (post: IPost, id: number) => void
    handleComment: (post: IPost, id: number) => void
    likeCount: number
    retweetCount: number
    commentCount: number
    id: number
    post: IPost
}



export const PostInteraction: React.FC<Props> = (props: Props) => {

    return (
        <>
        <div className='flex'>
            <PostInteractionIcon 
            icon={<FaComment  data-testid='commentButton' onClick={() => props.handleComment(props.post, props.id)}/>}/>
            <p className='mt-3.5 text-xs'>{props.commentCount}</p>
            <PostInteractionIcon icon={<FaRetweet data-testid='retweetButton' 
            onClick={() => props.handleRetweet(props.post, props.id)}/>}/>
            <p className='mt-3.5 text-xs'>{props.retweetCount}</p>
            <PostInteractionIcon icon={<FaHeart  data-testid='likeButton' 
             onClick={() => props.handleLike(props.post, props.id)}/>}/>
            <p className='mt-3.5 text-xs'>{props.likeCount}</p>
        </div>
        </>
    )
}


const PostInteractionIcon = ({ icon }: {icon: IconBaseProps})  => (
    <div className='post-icon'>
        <>{icon}</>
    </div>
)