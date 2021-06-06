import Axios from 'axios'

export const unSplashService = {
    getTenPhotos
}

async function query(keyword = '16:9') {
    const UNSPLASH_API = 'XRQOpM2i_4jKCx8hYZ-DShQGDeJWMrx6hBqg3tpIgFo';
    const res = await Axios.get(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=${UNSPLASH_API}`)
    return res.data
}

async function getTenPhotos() {
    const { results } = await query()
    // results.reduce()
}