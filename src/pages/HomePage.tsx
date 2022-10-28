import react from 'react'
import {useState } from 'react'
import {Post} from '../components/Post'
import { CreatePost } from '../components/CreatePost'

export const HomePage: React.FC = ({}) => {


const [newPost, setNewPost] = useState({
    postTextBody: '',
    postMedia: ''
})
const [postData, setPostData] = useState([{
    id:1,
    userName:'kreid01',
    userAt:'@kreid01',
    userImg:'https://cdn.vox-cdn.com/thumbor/tBc_7lQ2WMFz6PB_O7j7clOZbPo=/0x0:670x377/1200x800/filters:focal(274x87:380x193)/cdn.vox-cdn.com/uploads/chorus_image/image/51248321/1_hey-arnold.0.jpg',
    postTextBody:'this is my first post on this fake website',
    postMediaBody:'https://m.media-amazon.com/images/I/716znUej5nL._AC_SX522_.jpg',
    postDate:'28 Oct',
    commentCount:201,
    likeCount:100,
    retweetCount:23,
    isLiked: false,
    isRetweeted: false
}])

const handleComment = () => {
}

const handleRetweet = () => {
    
}

const handleLike = () => {

}

const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value
    }))
    console.log(newPost)
}

    return (
        <>
        <div className='ml-20'>
            <h1 className='pl-5 pt-3 pb-3 fixed w-full
                       backdrop-blur-lg font-bold bg-slate-400 
                       bg-opacity-5 font'>Home</h1>
            <div className='container-fluid pt-20 pl-5'>
                <CreatePost 
                newPost={{
                    postTextBody:'',
                    postMedia: ''
                }}
                handleChange={handleChange}/>
                <div className=''>
                    <Post
                    postData={postData} 
                    id={postData[0].id}
                    userName={postData[0].userName}
                    userAt={postData[0].userAt}
                    userImg={postData[0].userImg}
                    postTextBody={postData[0].postTextBody}
                    postMediaBody={postData[0].postMediaBody}
                    postDate={postData[0].postDate}
                    commentCount={postData[0].commentCount}
                    likeCount={postData[0].likeCount}
                    retweetCount={postData[0].retweetCount}
                    isLiked={postData[0].isRetweeted}
                    isRetweeted={postData[0].isLiked}
                    handleComment={handleComment}
                    handleRetweet={handleRetweet}
                    handleLike={handleLike}
                    />
                </div>
            </div>
        </div>
        </>
    )
}