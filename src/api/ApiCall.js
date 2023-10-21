import axios from "axios"

export const getRequest = async (url) => {
    const response = axios.get(url)
    return (await response).data
}

export const postRequest = async (url, data) => {
    const response = await axios.post(url, data)
    return response.data
}

export const putRequest = async (url, data) => {
    const response = await axios.put(url, data)
    return response.data
}