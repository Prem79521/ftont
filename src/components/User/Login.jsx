import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import './Login.css';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
            setHasError(true);
            setTimeout(() => setHasError(false), 2000);
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Login | Flipkart" />

            {/* Background Gradient Wrapper */}
            <div className="login-container relative overflow-hidden bg-transparent">
                {/* Decorative Subtle Background Gradients */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#ff7a00] rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
                
                {loading && <BackdropLoader />}

                {/* Login Card */}
                <main className="relative z-10 w-full flex justify-center">
                    <div className="login-box shadow-2xl border border-white/5">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Welcome Back</h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="flex flex-col gap-2">
                            
                            <div className="flex flex-col gap-2">
                                <div className="input-group group">
                                    <div className="absolute left-3.5 top-[18px] z-10 text-gray-500 group-focus-within:text-[#ff7a00] transition-colors pointer-events-none flex items-center">
                                        <EmailOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </div>
                                    <input
                                        id="email"
                                        placeholder=" "
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`!pl-11 ${hasError ? 'input-error' : ''}`}
                                    />
                                    <label htmlFor="email" className="floating-label">Email Address</label>
                                </div>
                                <div className="input-group group">
                                    <div className="absolute left-3.5 top-[18px] z-10 text-gray-500 group-focus-within:text-[#ff7a00] transition-colors pointer-events-none flex items-center">
                                        <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </div>
                                    <input
                                        id="password"
                                        placeholder=" "
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={`!pl-11 !pr-10 ${hasError ? 'input-error' : ''}`}
                                    />
                                    <label htmlFor="password" className="floating-label">Password</label>
                                    <div className="absolute right-3.5 top-[18px] z-10 text-gray-500 hover:text-white cursor-pointer transition-colors flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} /> : <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} />}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-1">
                                <button type="submit" className="w-full text-[15px] font-semibold py-3 shadow-[0_4px_14px_rgba(255,122,0,0.2)] mt-2">
                                    Sign In
                                </button>
                                
                                <Link to="/password/forgot" className="text-center text-sm font-medium text-gray-400 hover:text-[#ff7a00] transition-colors py-1">
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>

                        <div className="mt-6 border-t border-white/10 pt-4 text-center">
                            <p className="text-sm text-gray-400">
                                New to Flipkart?{' '}
                                <Link to="/register" className="font-semibold text-[#ff7a00] hover:text-[#ff8c1a] transition-colors ml-1">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Login;
