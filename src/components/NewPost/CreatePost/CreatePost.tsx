import React, { useState, useEffect } from 'react' 
import {FaCalendar, FaSmile} from 'react-icons/fa'
import {IconBaseProps} from 'react-icons'
import { TweetButton } from '../TweetButton/TweetButton'
import { FileUpload } from '../FileUpload/FileUpload'
import { PreviewImg } from '../PreviewImg/PreviewImg'
import { UserTextInput } from '../UserTextInput/UserTextInput'

interface newPost {
    postTextBody: string
    postMedia: string
}

interface Props {
    newPost: newPost
    setNewPost: React.Dispatch<React.SetStateAction<{
        postTextBody: string;
        postMedia: string;
        userAt: string;
        userName: string;
        userImg: string;
    }>>
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleTweet: () => void
}

export const CreatePost: React.FC<Props> = ({ handleChange, handleTweet, setNewPost }, props: Props) => {
 
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
                setNewPost(prevState => ({
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
                <UserTextInput handleChange={handleChange} />
                <PreviewImg imgSrc={preview as string}/>
                <div className='flex'>
                    <FileUpload 
                        handleFileUpload={handleFileUpload}/>
                    <NewPostButtons icon={<FaCalendar/>}/>
                    <NewPostButtons icon={<FaSmile/>}/>
                    <TweetButton
                        label="Tweet"
                        handleTweet={handleTweet}></TweetButton>
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