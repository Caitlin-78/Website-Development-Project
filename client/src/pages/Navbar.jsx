import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/lost-and-found">Lost & Found</Link></li>
                <li><Link to="/submit-item">Submit an Item</Link></li>
                <li><Link to="/profile">Your Profile <comment>Replace this text with user pfp later</comment></Link></li>
                <li><Link to="/map">UCVTS Map</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
            </ul>
        </>
    )
}