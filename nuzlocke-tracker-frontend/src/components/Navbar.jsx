import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authTokenAtom, currentRunAtom } from '../atoms';

const Navbar = () => {
    const navigate = useNavigate();
    const [, setToken] = useAtom(authTokenAtom);
    const [, setRun] = useAtom(currentRunAtom);

    const handleLogout = () => {
        setToken('');
        setRun(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className='flex gap-4 mb-6'>
            <Link to='/tracker' className='btn btn-sm'>Tracker</Link>
            <Link to='/box' className='btn btn-sm'>Box</Link>
            <Link to='/grave' className='btn btn-sm'>Grave</Link>
            <button onClick={handleLogout} className='btn btn-sm btn-error'>Logout</button>
        </nav>
    );
};

export default Navbar;