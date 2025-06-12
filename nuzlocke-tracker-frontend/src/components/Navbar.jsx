import { Link, useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userAtom, currentRunAtom } from '../atoms';

const Navbar = () => {
    const navigate = useNavigate();
    const setUser = useSetAtom(userAtom);
    const setCurrentRun = useSetAtom(currentRunAtom);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setUser(null); // Clear user data
            setCurrentRun(null); // Clear current run data
            navigate('/login');
        }
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