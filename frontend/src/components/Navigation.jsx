import {useState} from 'react'; 
import {Link} from 'react-router-dom';
import './Navigation.css'; 

function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className = "navbar">
            <div className = "navbar-logo">HelloRoomie</div>

            <button 
             className = "navbar-toggle"
             onClick = {() => setMenuOpen(!menuOpen)}
             aria-label = "Toggle Menu"
             >
                ☰
            </button>

            <div className = {`navbar-links ${menuOpen ? 'active' : ''}`}>
                <Link to = "/" onClick = {() => setMenuOpen(false)}>Home</Link>
                <Link to = "/add-profile" onClick = {() => setMenuOpen(false)}>List Yourself</Link>
            </div>
        </nav>
    );
}

export default Navigation;
