import React from 'react' 
import { FaImage, FaCalendar, FaSmile} from 'react-icons/fa'
import {IconBaseProps} from 'react-icons'

interface newPost {
    postTextBody: string
    postMedia: string
}

interface Props {
    newPost: newPost
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const CreatePost: React.FC<Props> = ({ handleChange }, props: Props) => {
    

    
    return (
        <div className='bottom-3 px-3 mb-36 flex'>
            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='w-12 h-12'alt=''/>
            <div>
                <textarea 
                onChange={(event) => handleChange(event)}
                name='postTextBody'
                className="pl-3 min-w-28 border-gray-300 resize-none text-gray-900 text-sm rounded-lg outline-0 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Whats Happening?" required/>
                <div className='flex'>
                    <NewPostButtons icon={<FaImage/>}/>
                    <NewPostButtons icon={<FaCalendar/>}/>
                    <NewPostButtons icon={<FaSmile/>}/>
                    <button
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