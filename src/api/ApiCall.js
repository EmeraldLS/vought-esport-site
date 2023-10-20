import axios from "../axios"

export const getRequest = async (url) => {
    const response = axios.get(url)
    return (await response).data
}