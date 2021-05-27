import { Component } from 'react'

export class Home extends Component {

    componentDidMount() {
        this.props.history.push('/board/ERQW!123qweASD3')
    }

    render() {
        return (
            <div>
                SHALOM LEHEM
            </div>
        )
    }
}
