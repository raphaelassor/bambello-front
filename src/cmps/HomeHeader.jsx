import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HomepageLogo } from '../assets/img/logos/home-logo.svg'

export class HomeHeader extends Component {


    render() {
        return (
            <header className="home-header">
                <nav className="flex justify-space-between">
                    <div className="logo">
                        <HomepageLogo />
                        Bambello
                    </div>

                    <div className="nav-btns">
                        <Link to="/login" className="login-btn clean-link">
                            Log in
                        </Link>
                        <Link to="/signup" className="signup-btn clean-link">
                            Sign up
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }
}
