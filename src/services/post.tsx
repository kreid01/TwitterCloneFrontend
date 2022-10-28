import axios from 'axios'

export const post = async () => {
        
    try {
        const res = await axios.post('')
        console.log("posted", res.data)
    } catch (err) {
    console.log(err)
    }
}