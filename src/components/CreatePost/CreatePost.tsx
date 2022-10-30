import React, { useState, useEffect } from 'react' 
import {FaCalendar, FaSmile, FaImage} from 'react-icons/fa'
import {IconBaseProps} from 'react-icons'
import { TweetButton } from '../TweetButton/TweetButton'
import { FileUpload } from './FileUpload'

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
            <p>{preview}</p>
                <form>
                    <textarea 
                    onChange={(event) => handleChange(event)}
                    name='postTextBody'
                    className="text-lg pl-3 w-72 border-gray-300 h-36 resize-none
                    text-gray-900 rounded-lg outline-0 block p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Whats Happening?" required/>
                    <img alt='' className='w-80 pt-2 pb-6 max-h-72 rounded-xl' src={preview as string}/>
                    <div className='flex'>
                        <FileUpload 
                        label={<NewPostButtons icon={<FaImage />}/>}
                        handleFileUpload={handleFileUpload}/>
                        <NewPostButtons icon={<FaCalendar/>}/>
                        <NewPostButtons icon={<FaSmile/>}/>
                        <TweetButton
                        label="Tweet"
                         handleTweet={handleTweet}></TweetButton>
                    </div>
                </form>
            </div>   
        </div>
    )

}

export const NewPostButtons = ({ icon }: {icon: IconBaseProps})  => (
    <div className='post-icon'>
        <>{icon}</>
    </div>
)