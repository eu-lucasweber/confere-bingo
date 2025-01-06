import { Link } from 'react-router-dom';
import './Home.css'

function Home(){
    return(
        <div className='home'>
            <div className='corpo'>
                <Link to="/minhasCartelas/1"><button className='btn'>Minhas Cartelas</button></Link>
                <Link to="/novoJogo"><button className='btn'>Novo Jogo</button></Link>
                <Link to="/continuarJogo"><button className='btn'>Continuar Jogo</button></Link>
            </div>
        </div>
    )
}

export default Home;