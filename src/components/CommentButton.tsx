import React from 'react'
import {IPost, INewComment} from '../consts/Interface'

interface Props  {
    handleReply: (Post: IPost, newComment: INewComment ) => void
    post: IPost
    newComment: INewComment
}

export const CommentButton: React.FC<Props> = ({handleReply, post, newComment}) => {

    return (
        <button onClick={() => handleReply(post, newComment)} className='button-primary mb-3'>Reply</button>
    )
} 