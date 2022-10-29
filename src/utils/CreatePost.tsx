import React, { useState, useEffect } from 'react' 
import { FaImage, FaCalendar, FaSmile} from 'react-icons/fa'
import {IconBaseProps} from 'react-icons'

interface newPost {
    postTextBody: string
    postMedia: string
}

interface Props {
    newPost: newPost
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleTweet: () => void
}

export const CreatePost: React.FC<Props> = ({ handleChange, handleTweet}, props: Props) => {
 
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
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(image)
            console.log(preview)
        } else {
            setPreview(null)
        } 
    },[image])

    
    return (
        
        <div className='bottom-3 px-3 mb-18 flex'>
            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='w-12 h-12'alt=''/>
            <div>
            <p>{preview}</p>
                <textarea 
                onChange={(event) => handleChange(event)}
                name='postTextBody'
                className="text-lg pl-3 w-72 border-gray-300 h-36 resize-none
                 text-gray-900 rounded-lg outline-0 block p-2.5 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                   placeholder="Whats Happening?" required/>
                <img alt='' className='w-80 pt-2 pb-6 max-h-72 rounded-xl' src={preview as string}/>
                <div className='flex'>
                    <input 
                    accept="image/*"
                    className='hidden'
                    name='postMedia'
                    id='postMedia' onChange={(event) => handleFileUpload(event)} type='file'/>
                    <label htmlFor='postMedia'><NewPostButtons icon={<FaImage />}/></label>
                    <NewPostButtons icon={<FaCalendar/>}/>
                    <NewPostButtons icon={<FaSmile/>}/>
                    <button
                    type='submit'
                    onClick={handleTweet}
                     className='font-bold text-white ml-auto bg-blue-500 hover:bg-blue-400 p-2 pl-4 pr-4 rounded-2xl'>Tweet</button>
                </div>
            </div>   
        </div>
    )

}

const NewPostButtons = ({ icon }: {icon: IconBaseProps})  => (
    <div className='post-icon'>
        <>{icon}</>
    </div>
)