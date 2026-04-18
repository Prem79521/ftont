import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Login.css';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("email", email);
        dispatch(forgotPassword(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
            setHasError(true);
            setTimeout(() => setHasError(false), 2000);
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
            setEmail("");
        }
    }, [dispatch, error, message, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Forgot Password | Recovery" />

            <div className="login-container relative overflow-hidden bg-transparent">
                {/* Decorative Gradients */}
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#ff7a00] rounded-full filter blur-[150px] opacity-10 pointer-events-none transition-all duration-1000"></div>
                
                {loading && <BackdropLoader />}

                <main className="relative z-10 w-full flex justify-center px-4">
                    <div className="login-box shadow-2xl border border-white/5 flex flex-col pt-8 pb-10 px-8 relative transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,122,0,0.1)]">
                    
                        {/* Back Button */}
                        <div className="absolute top-5 left-5 cursor-pointer group p-2">
                           <Link to="/login">
                                <ArrowBackIcon className="text-gray-500 group-hover:text-white transition-colors duration-300" sx={{ fontSize: "18px" }} />
                           </Link>
                        </div>
                        
                        {/* Header Details */}
                        <div className="mt-4 mb-8 text-center flex flex-col items-center">
                           <div className="w-14 h-14 bg-[#ff7a00]/10 rounded-2xl flex items-center justify-center mb-5 border border-[#ff7a00]/20 shadow-[0_0_15px_rgba(255,122,0,0.1)]">
                               <EmailOutlinedIcon className="text-[#ff7a00]" fontSize="small" />
                           </div>
                            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
                            <p className="text-gray-400 text-sm font-medium max-w-[250px] mx-auto leading-relaxed">
                                Enter your email and we'll send you a link to reset your password.
                            </p>
                        </div>

                        {/* Interactive State Rendering */}
                        {message ? (
                            <div className="flex flex-col items-center p-6 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-xl mb-4 text-center transform transition-all duration-500 scale-100">
                                <CheckCircleOutlineIcon className="text-[#00ff88] mb-3 drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]" sx={{ fontSize: "42px" }} />
                                <h3 className="text-[#00ff88] font-semibold mb-1 text-lg">Check your inbox</h3>
                                <p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">
                                    We've dispatched a recovery link to your registered email address.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 transform transition-all duration-300">
                                <div className="input-group group mt-0">
                                    <div className="absolute left-3.5 top-[18px] z-10 text-gray-500 group-focus-within:text-[#ff7a00] transition-colors duration-300 pointer-events-none flex items-center">
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

                                <button type="submit" className="w-full text-[15px] font-semibold py-3 shadow-[0_4px_14px_rgba(255,122,0,0.2)] flex justify-center items-center gap-2 transition-all duration-300">
                                    Send Reset Link
                                </button>
                            </form>
                        )}

                        {/* Footer Subtext */}
                        <div className="mt-8 text-center pt-5 border-t border-white/5">
                            <p className="text-xs text-gray-500 font-medium">
                                Wait, I remember my password...{' '}
                                <Link to="/login" className="text-[#ff7a00] hover:text-[#ff8c1a] font-semibold transition-colors ml-1">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ForgotPassword;