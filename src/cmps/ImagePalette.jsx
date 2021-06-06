import { Component } from 'react'
import { unSplashService } from '../services/unsplash.service'

export class ImagePalette extends Component {

    state = {
        imgs: []
    }

    componentDidMount() {
        this.loadImgs()
    }

    loadImgs = async () => {
        try {
            const imgs = await unSplashService.getTenImgs()
            this.setState({ imgs })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { imgs } = this.state
        const { handleChange } = this.props

        if (!imgs) return <div></div>

        return <div className="image-palette">
            {imgs.map(img => {
                return <label
                    key={img.id}
                    name="label-img"
                    className="flex align-center justify-center"
                    style={{ backgroundImage: `url(${img.small})` }}
                    htmlFor={`img-${img.id}`}>
                    <input type="radio" name="imgUrl" id={`img-${img.id}`} value={img.full} onClick={handleChange} />
                </label>
            })}
        </div>
    }
}

