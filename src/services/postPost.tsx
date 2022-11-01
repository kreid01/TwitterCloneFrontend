import axios from 'axios'

interface newPost {
    postTextBody: string
    postMedia: string
    userName: string
    userAt : string
    userImg: string
}

export const postPost = async (post: newPost) => {

    const newPost = {
        "userAt": `${post.userAt}`,
        "postTextBody": `${post.postTextBody}`,
        "userName": `${post.userName}`,
        "userImg": `${post.userImg}`,
        "postMedia": `${post.postMedia}`
      }
    

    const newPostForUser = {
        "posts": [newPost]
    }
        
    console.log(newPostForUser)
    
    try {
        const res = await axios.post('https://localhost:7227/posts', newPost)
        const userRes = await axios.put('https://localhost:7227/users/2', newPostForUser)
        console.log("posted", res.data, userRes)
    } catch (err) {
    console.log(err)
    }
}