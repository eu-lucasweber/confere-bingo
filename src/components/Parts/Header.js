import { Link } from 'react-router-dom';
import './Parts.css'


function Header(){
    return(
        <div className="Header">
            <Link to="/" className='link'><h1 className='titulo'>Confere Bingo</h1></Link>
        </div>
    )
}

export default Header;