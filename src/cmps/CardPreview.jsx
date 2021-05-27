import { Component } from 'react'

export class CardPreview extends Component {

    componentDidMount() {
    }

    render() {
        const { card } = this.props
        return (
                <div className="card">
                <div className="card-menu"></div>
                    User Management
                {/* <pre>{JSON.stringify(card, null, 2)}</pre> */}
                </div>
        )
    }
}
