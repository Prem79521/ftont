import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import WcIcon from '@mui/icons-material/Wc';
import './Login.css';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    const { name, email, gender, password, cpassword } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("preview.png");
    
    // Toggles for password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [hasError, setHasError] = useState(false);

    const triggerError = (msg, mode = "error") => {
        enqueueSnackbar(msg, { variant: mode });
        setHasError(true);
        setTimeout(() => setHasError(false), 2000);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) return triggerError("Password length must be at least 8 characters", "warning");
        if (password !== cpassword) return triggerError("Passwords do not match");
        if (!gender) return triggerError("Please select your gender");
        if (!avatar) return triggerError("Please select an avatar image");

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("password", password);
        formData.set("avatar", avatar);

        dispatch(registerUser(formData));
    }

    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }
    
    const setGender = (selected) => {
        setUser({ ...user, gender: selected });
    }

    useEffect(() => {
        if (error) {
            triggerError(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);
    
    // Password Strength Logic
    const getStrengthLevel = () => {
        if (!password) return 0;
        if (password.length < 5) return 1;
        if (password.length < 8) return 2;
        if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)) return 4;
        return 3;
    };
    const strength = getStrengthLevel();
    const strengthColors = ["bg-gray-700", "bg-red-500", "bg-orange-500", "bg-yellow-400", "bg-green-500"];
    const strengthLabels = ["", "Too Weak", "Weak", "Good", "Strong"];

    return (
        <>
            <MetaData title="Create Account | Premium" />

            <div className="login-container relative overflow-hidden bg-transparent !min-h-screen !h-auto py-12">
                {/* Decorative Gradients */}
                <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-[#ff7a00] rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-[#ff8c1a] rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
                
                {loading && <BackdropLoader />}

                <main className="relative z-10 w-full flex justify-center px-4 animate-fade-in my-8">
                    <div className="login-box shadow-2xl border border-white/5 flex flex-col pt-8 pb-10 px-6 sm:px-10 relative !w-[480px] !max-w-full">
                        
                        {/* Header Details */}
                        <div className="text-center mb-8 flex flex-col items-center">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
                            <p className="text-gray-400 text-sm font-medium w-full">Join us and experience the extraordinary.</p>
                        </div>

                        <form onSubmit={handleRegister} className="flex flex-col gap-5">
                            
                            {/* Input Name & Email */}
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-4 w-full">
                                <div className="input-group group !mt-0 w-full !mb-0">
                                    <div className="absolute left-3.5 top-[18px] z-10 text-gray-500 group-focus-within:text-[#ff7a00] transition-colors pointer-events-none flex items-center">
                                        <PersonOutlineIcon sx={{ fontSize: "20px" }} />
                                    </div>
                                    <input
                                        placeholder=" "
                                        name="name"
                                        value={name}
                                        onChange={handleDataChange}
                                        required
                                        className={`!pl-11 ${hasError ? 'input-error' : ''}`}
                                    />
                                    <label className="floating-label">Full Name</label>
                                </div>
                                <div className="input-group group !mt-0 w-full !mb-0">
                                    <div className="absolute left-3.5 top-[18px] z-10 text-gray-500 group-focus-within:text-[#ff7a00] transition-colors pointer-events-none flex items-center">
                                        <EmailOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </div>
                                    <input
                                        placeholder=" "
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleDataChange}
                                        required
                                        className={`!pl-11 ${hasError ? 'input-error' : ''}`}
                                    />
                                    <label className="floating-label">Email Address</label>
                                </div>
                            </div>

                            {/* Gender & Avatar Array */}
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-4">
                                <div className="flex-1 bg-[#1a1a1a] rounded-[8px] p-2 flex flex-col justify-center border border-transparent hover:border-white/10 transition-colors">
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => setGender('male')} className={`flex-1 py-1.5 rounded text-xs font-semibold transition-all ${gender === 'male' ? 'bg-[#ff7a00] text-white shadow-md' : 'bg-transparent text-gray-400 hover:bg-white/5'}`}>
                                            Male
                                        </button>
                                        <button type="button" onClick={() => setGender('female')} className={`flex-1 py-1.5 rounded text-xs font-semibold transition-all ${gender === 'female' ? 'bg-[#ff7a00] text-white shadow-md' : 'bg-transparent text-gray-400 hover:bg-white/5'}`}>
                                            Female
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 relative group cursor-pointer h-[50px]">
                                    <label className="flex items-center gap-3 w-full h-full bg-[#1a1a1a] rounded-[8px] px-3 cursor-pointer border border-transparent hover:border-white/10 transition-colors">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            className="hidden"
                                        />
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex-shrink-0 flex items-center justify-center border border-[#ff7a00]/30 shadow-sm">
                                            {avatarPreview === 'preview.png' ? <CloudUploadOutlinedIcon sx={{ fontSize: '16px', color: '#ccc' }} /> : <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />}
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors truncate">
                                            {avatarPreview === 'preview.png' ? 'Upload Avatar' : 'Avatar Set'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Passwords */}
                            <div className="input-group group !mt-0 !mb-0">
                                <div className="absolute left-3.5 top-[18px] z-10 text-gray-500 group-focus-within:text-[#ff7a00] transition-colors pointer-events-none flex items-center">
                                    <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                                </div>
                                <input
                                    placeholder=" "
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleDataChange}
                                    required
                                    className={`!pl-11 !pr-10 ${hasError ? 'input-error' : ''}`}
                                />
                                <label className="floating-label">Create Password</label>
                                <div className="absolute right-3.5 top-[18px] z-10 text-gray-500 hover:text-white cursor-pointer transition-colors flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "20px" }} /> : <VisibilityOutlinedIcon sx={{ fontSize: "20px" }} />}
                                </div>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="flex flex-col gap-1 -mt-2 mb-1 px-1">
                                    <div className="flex gap-1 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div key={level} className={`h-full flex-1 transition-colors duration-500 ${strength >= level ? strengthColors[strength] : 'bg-transparent'}`}></div>
                                        ))}
                                    </div>
                                    <span className={`text-[10px] font-semibold tracking-wide uppercase mt-0.5 text-right ${strength > 0 ? (strength >= 3 ? 'text-green-500' : 'text-orange-500') : 'text-gray-500'}`}>
                                        {strengthLabels[strength]}
                                    </span>
                                </div>
                            )}

                            <div className="input-group group !mt-0 !mb-0">
                                <div className="absolute left-3.5 top-[18px] z-10 text-gray-500 group-focus-within:text-[#ff7a00] transition-colors pointer-events-none flex items-center">
                                    <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                                </div>
                                <input
                                    placeholder=" "
                                    type={showCPassword ? "text" : "password"}
                                    name="cpassword"
                                    value={cpassword}
                                    onChange={handleDataChange}
                                    required
                                    className={`!pl-11 !pr-10 ${hasError ? 'input-error' : ''}`}
                                />
                                <label className="floating-label">Confirm Password</label>
                                <div className="absolute right-3.5 top-[18px] z-10 text-gray-500 hover:text-white cursor-pointer transition-colors flex items-center" onClick={() => setShowCPassword(!showCPassword)}>
                                    {showCPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "20px" }} /> : <VisibilityOutlinedIcon sx={{ fontSize: "20px" }} />}
                                </div>
                            </div>

                            <button type="submit" className="w-full text-[15px] font-bold tracking-wide py-3.5 shadow-[0_4px_14px_rgba(255,122,0,0.2)] mt-5 flex justify-center items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 uppercase rounded-xl">
                                Create Account
                            </button>
                        </form>

                        <div className="mt-8 text-center pt-5 border-t border-white/5">
                            <p className="text-[13px] text-gray-400 font-medium tracking-wide">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#ff7a00] hover:text-[#ff8c1a] font-bold transition-colors ml-1">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Register;
