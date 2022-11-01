import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {CreateComment} from './CreateComment'
import { FaArrowLeft } from 'react-icons/fa'
import { CommentButton } from './CommentButton'

import { IPost, INewComment } from 'consts/Interface'
import { updatePostWithComment } from 'services/updatePost'

interface Props {
    post: IPost
    closeComment: () => void
    isCommenting: boolean
}

export const SpecificPost: React.FC<Props> = ({ post, closeComment}) => {

    const [newComment, setNewComment] = useState({
        commentBody: '',
        commentMedia: '',
        userAt: 'BLAD33',
        userName: 'bladee',
        userImg: "https://i1.sndcdn.com/artworks-z7ABLFRxBZUd1j0w-ANNyqw-t500x500.jpg",
    })

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {  
        setNewComment(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value 
        }))
    }
    
    const handleReply = (post: IPost, newPost: INewComment ) => {
        updatePostWithComment(post, newPost)
    }

    return (
        <div className='mb-5 ml-20 absolute bg-white h-full z-10 ' data-testid='post'>
            <header className='pl-4 pt-4 pb-1 w-full
            backdrop-blur-lg bg-slate-400 
            bg-opacity-5 flex'>
                <button onClick={closeComment} className='mr-4 mb-4'><FaArrowLeft/></button>
                <CommentButton 
                post={post}
                newComment={newComment}
                handleReply={handleReply}/>
            </header>
            <div className='flex mt-8 mb-4'>
                <img className='w-12 h-12 rounded-full' src={post.userImg} alt=''/>
                <div className='flex-col pl-4'>  
                        <p className=''><Link to={`/${post.userAt}`}><strong>{post.userName}</strong></Link>
                        <span className='text-gray-500'>@{post.userAt}·{post.postDate.substring(0,7)}</span></p>
                    <p>{post.postTextBody}</p>
                    <img 
                    className='w-80 pt-2 max-h-72 rounded-xl'
                    src={post.postMedia} alt='' data-testid='media'/>
                </div>
            </div>
            <CreateComment
            handleChange={handleChange}
            setNewComment={setNewComment}
            newComment={newComment} />
        </div>
    )
}