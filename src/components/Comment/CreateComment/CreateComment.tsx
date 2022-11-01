import React, { useState, useEffect } from 'react' 
import {FaCalendar, FaSmile} from 'react-icons/fa'
import {IconBaseProps} from 'react-icons'
import { FileUpload } from '../../NewPost/FileUpload/FileUpload'
import { PreviewImg } from '../../NewPost/PreviewImg/PreviewImg'
import { UserTextInput } from '../../NewPost/UserTextInput/UserTextInput'

type newComment = {
    commentBody: string
    commentMedia: string
}

interface Props {
    newComment: newComment
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    setNewComment: React.Dispatch<React.SetStateAction<{
        commentBody: string;
        commentMedia: string;
        userAt: string;
        userName: string;
        userImg: string;
    }>>
}

export const CreateComment: React.FC<Props> = ({ handleChange, setNewComment }) => {
 
    const [image, setImage] = useState<File | null>()
    const [preview, setPreview] = useState<string | null>()

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files
        if(file) {
            if(file) {
            setImage(file[0])
            } else {
                setImage(null)
            }     
        }
    } 

    useEffect(() => {
        if(image) {
            const reader = new FileReader()
            let url = ''
            reader.onloadend = () => {
                setPreview(reader.result as string)
                url = reader.result as string
                setNewComment(prevState => ({
                    ...prevState, postMedia: url
                }))
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        } 
    },[image])
 
   


    return (
        
        <div className='bottom-3 px-3 mb-18 flex'>
            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='w-12 h-12'alt=''/>
            <div>
                <UserTextInput 
                name={'commentBody'}
                handleChange={handleChange} />
                <PreviewImg imgSrc={preview as string}/>
                <div className='flex'>
                    <FileUpload 
                        handleFileUpload={handleFileUpload}/>
                    <NewPostButtons icon={<FaCalendar/>}/>
                    <NewPostButtons icon={<FaSmile/>}/>
                </div>
            </div>   
        </div>
    )

}

export const NewPostButtons = ({ icon }: {icon: IconBaseProps})  => (
    <div className='post-icon'>
        <>{icon}</>
    </div>
)