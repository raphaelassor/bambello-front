import { Component } from 'react'
import { HomeHeader } from '../cmps/HomeHeader'
import heroImgUrl from '../assets/img/hero.png'
import { Link } from 'react-router-dom'

export class Home extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="home">
                <HomeHeader />
                <main className="home-container">
                    <section className="hero">
                        <div className="hero-info">
                            <h1>Bambello helps teams move work forward.</h1>
                            <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Bambello.</p>

                            {/* FOR PRODUCTION: */}
                            {/* <Link to="/existingboard" className="clean-link">Try now!</Link> */}
                            <Link to="/signup" className="clean-link">Try now!</Link>
                        </div>
                        <div className="hero-img">
                            <img src={heroImgUrl} alt="" />
                        </div>
                    </section>
                    <section className="product">
                            <h2>It’s more than work. It’s a way of working together.</h2>
                            <p>Start with a Bambello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</p>
                            <Link to="/signup" class="clean-link" >Start doing →</Link>
                    </section>
                </main>
            </div>
        )
    }
}
