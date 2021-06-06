import Axios from 'axios'

const UNSPLASH_API = 'XRQOpM2i_4jKCx8hYZ-DShQGDeJWMrx6hBqg3tpIgFo';

export const unSplashService = {
    getTenImgs
}

async function query(keyword = '16:9') {
    const res = await Axios.get(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=${UNSPLASH_API}`)
    return res.data
}

async function getTenImgs() {
    const { results } = await query();
    return Promise.resolve(
        results.map(img => {
            return { id: img.id, small: img.urls.small, full: img.urls.full }
        })
    )
}