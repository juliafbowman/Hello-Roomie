import {useState} from 'react'; 
import {Link} from 'react-router-dom';
import './Navigation.css'; 

function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className = "navbar">
            <div className = "navbar-logo">Roommate Finder</div>

            <button 
             className = "navbar-toggle"
             onClick = {() => setMenuOpen(!menuOpen)}
             aria-label = "Toggle Menu"
             >
                ☰
            </button>

            <div className = {`navbar-links ${menuOpen ? 'active' : ''}`}>
                <Link to = "/" onClick = {() => setMenuOpen(false)}>Home</Link>
                <Link to = "/profile" onClick = {() => setMenuOpen(false)}>Profile</Link>
            </div>
        </nav>
    );
}

export default Navigation;
