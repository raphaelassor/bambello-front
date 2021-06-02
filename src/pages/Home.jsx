import { Component } from 'react'

export class Home extends Component {

    componentDidMount() {
        this.props.history.push('/board/60b6a6011c0a54523282a8a8')
    }

    render() {
        return (
            <div>
                SHALOM LEHEM
            </div>
        )
    }
}
