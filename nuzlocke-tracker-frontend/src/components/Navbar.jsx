import { Link, useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userAtom, currentRunAtom } from '../atoms';
import axiosInstance from '../api/connector';

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
            setUser(null);
            setCurrentRun(null);
            navigate('/login');
        }
    };

    return (
        <div className="navbar bg-neutral text-neutral-content shadow mb-6 rounded-box border-b-4 border-primary">
            <div className="flex-none gap-2">
                <Link to="/tracker" className="btn btn-outline btn-primary btn-sm">Tracker</Link>
                <Link to="/box" className="btn btn-outline btn-primary btn-sm">Box</Link>
                <Link to="/grave" className="btn btn-outline btn-primary btn-sm">Grave</Link>
            </div>
            <div className="flex-1 justify-center">
                <Link to="/tracker" className="btn btn-ghost normal-case text-2xl text-primary-content font-bold tracking-wide">
                    Nuzlocke Tracker
                </Link>
            </div>
            <div className="flex-none">
                <button onClick={handleLogout} className="btn btn-error btn-sm ml-2">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;