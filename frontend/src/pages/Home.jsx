import { Link } from "react-router-dom"
import Navbar from "../components/Navbar/MasterNavbar.jsx"
import "../styles/Home.css"

const Home = () => {
    return (
        <div>
            <Navbar />

            <main>
                <div class="jumbotron">
                    <h1 class="display-4">Book Your Train Tickets with Ease</h1>
                    <p class="lead">Experience hassle-free train ticket booking at your fingertips.</p>
                    <Link class="btn btn-warning rounded-0 btn-lg" to="/signup" role="button">Get Started</Link>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="feature-box">
                                <div class="feature-icon">
                                    <i class="fas fa-train"></i>
                                </div>
                                <h2 class="feature-title">Search Trains</h2>
                                <p class="feature-description">Find trains for your journey based on your preferences.</p>
                                <Link class="btn btn-primary rounded-0" to="/signup" role="button">Search Trains</Link>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="feature-box">
                                <div class="feature-icon">
                                    <i class="fas fa-ticket-alt"></i>
                                </div>
                                <h2 class="feature-title">Book Tickets</h2>
                                <p class="feature-description">Book tickets quickly and securely for your preferred train.</p>
                                <a class="btn btn-primary rounded-0" href="booking.html" role="button">Book Tickets</a>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="feature-box">
                                <div class="feature-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <h2 class="feature-title">Manage Bookings</h2>
                                <p class="feature-description">View and manage your booked tickets with ease.</p>
                                <a class="btn btn-primary rounded-0" href="bookings.html" role="button">Manage Bookings</a>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    )
}

export default Home