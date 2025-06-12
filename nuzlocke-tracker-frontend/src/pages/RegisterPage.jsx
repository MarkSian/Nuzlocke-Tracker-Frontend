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
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-neutral border-2 border-primary shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4 text-2xl text-primary">Register</h2>
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <input
                            name="username"
                            placeholder="Username"
                            className="input input-bordered input-primary border-2 border-primary w-full bg-base-100 text-base-content"
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="input input-bordered input-primary border-2 border-primary w-full bg-base-100 text-base-content"
                            required
                        />
                        <button type="submit" className="btn btn-primary w-full mt-2">
                            Register
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center">
                        Already have an account?{" "} {/*this line was added for spacing */}
                        <Link to="/login" className="link link-primary">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;