import React from 'react'
import react from 'react'
import { PostInteraction } from '../PostInteractions/PostInteraction'
import { IPost } from '../../consts/Interface'
import  {updatePostWithComment, updatePostWithLike, updatePostWithRetweet}  from '../../services/updatePost'

interface Props {
    post: IPost
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
    ref?: react.MutableRefObject<null>
}

const handleComment = (post: IPost, id: number) => {
    updatePostWithComment(post, id)
}

const handleRetweet = (post: IPost, id: number) => {  
    updatePostWithRetweet(post, id)
}


export const Post: React.FC<Props> = (props: Props) => {

    const [postForUpdating, setPostForUpdating] = React.useState(
        {...props.post, 
        isLiked: false,
        isRetweeted: false})

    const handleLike = (post: IPost, id :number) => {
        setPostForUpdating(prevState => (
        {...prevState,
            [prevState.likeCount] : prevState.likeCount + 1}
        ))
        console.log(postForUpdating.likeCount)
        updatePostWithLike(post, id)
    }
    


    return (
        <div className='flex mt-5 mb-5' data-testid='post'>
            <img className='w-12 h-12 rounded-full' src={props.userImg} alt=''/>
            <div className='flex-col pl-4'>  
                <p className=''><strong>{props.userName}</strong>
                <span className='text-gray-500'>@{props.userAt}·{props.postDate.substring(0,7)}</span></p>
                <p>{props.postTextBody}</p>
                <img 
                className='w-80 pt-2 max-h-72 rounded-xl'
                src={props.postMedia} alt='' data-testid='media'/>
                 <PostInteraction
                 post={postForUpdating} 
                 id={props.id}
                 handleComment={handleComment}
                 handleLike={handleLike}
                 handleRetweet={handleRetweet}
                 likeCount={postForUpdating.likeCount}
                 retweetCount={props.retweetCount}
                 commentCount={props.commentCount}/> 
            </div>          
        </div>
    )
}