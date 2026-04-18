import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = ({ _id, name, images, ratings, numOfReviews, price, cuttedPrice }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    return (
        <div className="flex flex-col items-start gap-2 p-5 relative bg-[var(--card)] border border-gray-800 rounded-[var(--radius-md)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.35)] group overflow-hidden">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center text-center group w-full">
                <div className="w-44 h-48 overflow-hidden rounded-md mb-3 transform group-hover:scale-110 transition-transform duration-500 ease-out">
                    <img draggable="false" className="w-full h-full object-contain drop-shadow-md" src={images && images[0].url} alt="" />
                </div>
                <h2 className="text-sm mt-3 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors text-left font-medium line-clamp-2 w-full">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</h2>
            </Link>
            {/* <!-- image & product title --> */}

            {/* <!-- product description --> */}
            <div className="flex flex-col gap-2 items-start w-full">
                {/* <!-- rating badge --> */}
                <span className="text-sm text-[var(--subtext)] font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-green-600 rounded-sm text-white flex items-center gap-0.5 shadow-sm">{ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} /></span>
                    <span>({numOfReviews})</span>
                </span>
                {/* <!-- rating badge --> */}

                {/* <!-- price container --> */}
                <div className="flex items-center gap-2 text-lg font-bold text-[var(--text)] mt-1">
                    <span>₹{price.toLocaleString()}</span>
                    <span className="text-[var(--subtext)] line-through text-sm font-normal">₹{cuttedPrice.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-green-500">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                </div>
                {/* <!-- price container --> */}
                
                {/* CTA Button */}
                <button className="w-full mt-3 py-2.5 bg-[var(--accent)] hover:bg-[var(--color-primary-hover)] text-white rounded-[var(--radius-sm)] font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 text-sm shadow-[var(--shadow-md)]">
                    View Details
                </button>
            </div>
            {/* <!-- product description --> */}

            {/* <!-- wishlist badge --> */}
            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"} absolute top-4 right-4 cursor-pointer transition-colors z-10 bg-[var(--bg)] p-1.5 rounded-full shadow-md`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
            {/* <!-- wishlist badge --> */}

        </div>
    );
};

export default Product;
