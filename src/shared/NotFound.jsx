import notFound from '../assets/images/404-not-found.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="mt-16 flex flex-col gap-4 items-center justify-center">
            <img draggable="false" className="sm:w-1/3 h-full" src={notFound} alt="Page Not Found" />
            <Link to="/" className="uppercase btn-primary">Back To Home</Link>
        </div>
    );
};

export default NotFound;
