import { Link } from 'react-router-dom'
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
    const {user} = useAuth0();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                <li>                      
                </li>               
            </ul>
            <div className="nav-right">
                {user
                ? <LogoutButton />
                : <LoginButton />}            
                </div>
            
        </nav>
    )
}

export default NavBar;