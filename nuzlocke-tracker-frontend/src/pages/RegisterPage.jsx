import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/connector';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            await axiosInstance.post('/auth/register', { username, password });
            alert('Registration successful! You can now log in.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed. ');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-xl mb-4'>Register</h2>
            <form onSubmit={handleRegister} className='card bg-base-100 p-4 shadow w-80'>
                <input name='username' placeholder='Username' className='input input-bordered mb-2' />
                <input name='password' type='password' placeholder='Password' className='input input-bordered mb-4' />
                <button type='submit' className='btn btn-primary'>Register</button>
            </form>
            <p className='mt-2'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
        </div>
    );
};

export default RegisterPage;