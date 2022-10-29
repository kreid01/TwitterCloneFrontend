import react from 'react'
import { PostInteraction } from './PostInteraction'

interface Props {
    postData: Array<Object>
    id: number
    userName: string
    userAt: string
    userImg: string
    postDate: string
    postTextBody: string
    postMediaBody: string
    likeCount: number
    retweetCount: number
    commentCount: number
    handleComment: () => void
    handleRetweet: () => void
    handleLike: () => void
}



export const Post: React.FC<Props> = (props: Props) => {

    return (
        <div className='flex'>
            <img className='w-12 h-12 rounded-full' src={props.userImg} alt=''/>
            <div className='flex-col pl-4'>  
                <p className=''><strong>{props.userName}</strong>
                <span>{props.userAt}·{props.postDate}</span></p>
                <p>{props.postTextBody}</p>
                <img 
                className='w-full pt-2 max-h-72 rounded-xl'
                src={props.postMediaBody} alt=''/>
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