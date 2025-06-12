import { useAtom } from 'jotai';
import { authTokenAtom, userAtom } from '../atoms';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [, setToken] = useAtom(authTokenAtom);
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setUser(res.data.user);
            navigate('/tracker');
        } catch (err) {
            alert('Login failed. Check credentials.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-xl mb-4'>Login</h2>
            <form onSubmit={handleLogin} className='card bg-base-100 p-4 shadow w-80'>
                <input name='username' placeholder='Username' className='input input-bordered mb-2' />
                <input name='password' type='password' placeholder='Password' className='input input-bordered mb-4' />
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
            <p className='mt-2'>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link></p>
        </div>
    );
};

export default LoginPage;