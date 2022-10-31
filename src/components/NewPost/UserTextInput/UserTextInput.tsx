import React from 'react';

interface Props {
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const UserTextInput: React.FC<Props> = ({ handleChange }) => {
    return (
        <textarea 
            onChange={(event) => handleChange(event)}
            name='postTextBody'
            className="text-lg pl-3 w-72 border-gray-300 h-36 resize-none text-gray-900 rounded-lg outline-0 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Whats Happening?" required/>
    )
}