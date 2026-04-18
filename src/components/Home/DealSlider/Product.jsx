import { Link } from 'react-router-dom';

const Product = ({ image, name, offer, tag }) => {
    return (
        <Link to="/products" className="flex flex-col items-center gap-2 p-5 mx-3 my-2 cursor-pointer bg-[var(--color-bg-secondary)] border border-gray-800 rounded-[var(--radius-md)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.5)] group">
            <div className="w-36 h-36 transform group-hover:scale-110 transition-transform duration-300 ease-out">
                <img draggable="false" className="w-full h-full object-contain drop-shadow-sm" src={image} alt={name} />
            </div>
            <h2 className="font-medium text-sm mt-3 text-center text-gray-200 group-hover:text-[var(--color-primary)] transition-colors">{name}</h2>
            <span className="text-[var(--color-primary)] text-sm font-semibold">{offer}</span>
            <span className="text-gray-400 text-xs">{tag}</span>
        </Link>
    );
};

export default Product;
