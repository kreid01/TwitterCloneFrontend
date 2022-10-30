import React from 'react'; 
import { NewPostButtons } from './CreatePost'
import { FaImage } from 'react-icons/fa'

interface Props {
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<Props> = ({ handleFileUpload }) => {
    return (
        <>
        <input 
        accept="image/*"
        className='hidden'
        name='postMedia'
        id='postMedia' onChange={(event) => handleFileUpload(event)} type='file'/>
        <label htmlFor='postMedia'><NewPostButtons icon={<FaImage />}/></label>
        </>
    )
}