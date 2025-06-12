import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/connector';


const LoginPage = () => {
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            const res = await axiosInstance.post('/auth/login', { username, password });
            // store user data in the atom
            // http-only cookies are used, so we don't need to store the token in localStorage
            setUser(res.data.user);
            navigate('/tracker');
        } catch (err) {
            alert('Login failed. Check credentials.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl border-2 border-primary">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4 text-2xl text-primary">Login</h2>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center">
                        Don't have an account?{" "} {/*this line was added for spacing */}
                        <Link to="/register" className="link link-primary">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;