import {Link, useLocation} from 'react-router';

const Nav = ({authorId}) => {
    const { pathname } = useLocation()
    
    return (
        <header className="nav">
            <Link to="/" className="nav-brand plain-link">Flavorful</Link>
            
            <nav className="nav-links">
                {pathname === '/' && <Link to="/feed" className="home-see-all">Feed</Link>}
                {pathname !== '/' && <span className="nav-uid" title={authorId}>Your ID: {authorId}</span>}
                <Link to="/create" className="nav-btn accent-btn plain-link">New post</Link>
            </nav>
        </header>
    )
}

export default Nav;