import React from 'react'
import react from 'react'
import { PostInteraction } from '../../utils/PostInteraction'

interface Props {
    id: number
    userName: string
    userAt: string
    userImg: string
    postDate: string
    postTextBody: string
    postMedia: string
    likeCount: number
    retweetCount: number
    commentCount: number
    handleComment: () => void
    handleRetweet: () => void
    handleLike: (id: number) => void
    ref?: react.MutableRefObject<null>
}

export const Post: React.FC<Props> = (props: Props) => {

    return (
        <div className='flex mt-5 mb-5' data-testid='post'>
            <img className='w-12 h-12 rounded-full' src={props.userImg} alt=''/>
            <div className='flex-col pl-4'>  
                <p className=''><strong>{props.userName}</strong>
                <span className='text-gray-500'>@{props.userAt}·{props.postDate.substring(0,7)}</span></p>
                <p>{props.postTextBody}</p>
                <img 
                className='w-80 pt-2 max-h-72 rounded-xl'
                src={props.postMedia} alt='media'/>
                 <PostInteraction 
                 id={props.id}
                 handleComment={props.handleComment}
                 handleLike={props.handleLike}
                 handleRetweet={props.handleRetweet}
                 likeCount={props.likeCount}
                 retweetCount={props.retweetCount}
                 commentCount={props.commentCount}/> 
            </div>          
        </div>
    )
}