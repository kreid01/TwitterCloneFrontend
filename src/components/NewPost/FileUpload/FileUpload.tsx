import React from 'react'; 
import { NewPostButtons } from '../CreatePost/CreatePost'
import { FaImage } from 'react-icons/fa'

interface Props {
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}

export const FileUpload: React.FC<Props> = ({ handleFileUpload, name }) => {
    return (
        <>
        <input 
        accept="image/*"
        className='hidden'
        data-testid='fileInput'
        name={name}
        id={name} onChange={(event) => handleFileUpload(event)} type='file'/>
        <label htmlFor={name}><NewPostButtons icon={<FaImage />}/></label>
        </>
    )
}