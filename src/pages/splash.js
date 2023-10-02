import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButtons/CommonButton';

function Splash() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>Bem vindo!</p>
                <CommonButton onClick={handleClick} label={"Iniciar"}/>
            </header>
        </div>
    )
}

export default Splash;