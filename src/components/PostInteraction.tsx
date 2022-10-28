import react from 'react'
import { IconBaseProps } from 'react-icons';
import { FaComment, FaRetweet, FaHeart } from 'react-icons/fa'

interface Props {
    handleLike: () => void
    handleRetweet: () => void
    handleComment: (id: number) => void
    likeCount: number
    retweetCount: number
    commentCount: number
    isLiked: boolean
    isRetweeted: boolean
    id: number
}

export const PostInteraction: React.FC<Props> = (props: Props) => {

    return (
        <>
        <div className='flex'>
            <PostInteractionIcon icon={<FaComment  onClick={() => props.handleComment}/>}/>
            <p className='mt-3.5 text-xs'>{props.commentCount}</p>
            <PostInteractionIcon icon={<FaRetweet onClick={() => props.handleRetweet}/>}/>
            <p className='mt-3.5 text-xs'>{props.retweetCount}</p>
            <PostInteractionIcon icon={<FaHeart onClick={() => props.handleLike}/>}/>
            <p className='mt-3.5 text-xs'>{props.likeCount}</p>
        </div>
        </>
    )
}


const PostInteractionIcon = ({ icon }: {icon: IconBaseProps})  => (
    <div className='post-icon'>
        <>{icon}</>
    </div>
)