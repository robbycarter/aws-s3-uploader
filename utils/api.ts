import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    validateStatus: function (status) {
        return status < 500 // Don't resolve status beyond 500
    }
})

export default api;
