import React from 'react';

interface Props {
    imgSrc:string
}

export const PreviewImg: React.FC<Props> = ({imgSrc}) => {

    return (
        <img alt='' 
        data-testid='previewImg'  
        className='w-80 pt-2 pb-6 max-h-72 rounded-xl'
         src={imgSrc}/>
    )
}