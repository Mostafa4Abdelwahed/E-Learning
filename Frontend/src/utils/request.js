import axios from "axios"

const request = axios.create({
    baseURL: "https://api-e-learning.vercel.app"
})

export default request
