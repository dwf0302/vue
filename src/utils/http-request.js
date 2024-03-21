import axios from 'axios'

axios.defaults.baseURL = "api"

const httpRequest = async (method, url, data) => {
    const response = await axios({
        method,
        url,
        data
    })
    return response.data.data
}
export default httpRequest