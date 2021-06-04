import { Component } from 'react'

export class Home extends Component {

    componentDidMount() {
        this.props.history.push('/signup')
    }

    render() {
        return (
            <div>
                SHALOM LEHEM
            </div>
        )
    }
}
