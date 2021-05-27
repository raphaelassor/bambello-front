import { Component } from 'react'

export class CardPreview extends Component {

    componentDidMount() {
    }

    render() {
        const { card } = this.props
        return (
                <div className="card-preview">
                <div className="card-preview-menu"></div>
                    {card.title}
                {/* <pre>{JSON.stringify(card, null, 2)}</pre> */}
                </div>
        )
    }
}
