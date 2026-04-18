import { getDiscount } from '../../../utils/functions';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';
import './Product.css';

const Product = (props) => {

    const { _id, name, images, ratings, numOfReviews, price, cuttedPrice } = props;

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
        <div className="card flex flex-col items-center gap-3 p-5 mx-3 my-2 relative group w-full max-w-[300px]">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center text-center w-full">
                <div className="w-40 h-40 flex items-center justify-center p-2 mb-2 relative">
                    <img draggable="false" className="object-contain drop-shadow-sm max-h-full" src={images[0].url} alt={name} />
                </div>
                <h2 className="card-title text-center line-clamp-2 leading-snug group-hover:text-[#ff7a00] transition-colors duration-300" title={name}>{name.length > 45 ? `${name.substring(0, 45)}...` : name}</h2>
            </Link>
            {/* <!-- image & product title --> */}

            {/* <!-- product description --> */}
            <div className="flex flex-col gap-2 items-center w-full mt-2">
                {/* <!-- rating badge --> */}
                <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-1 shadow-sm font-medium">
                        {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "12px" }} />
                    </span>
                    <span className="text-xs text-gray-500 font-medium">({numOfReviews.toLocaleString()})</span>
                </div>
                {/* <!-- rating badge --> */}

                {/* <!-- price container --> */}
                <div className="flex items-end gap-2 mt-1">
                    <span className="card-price text-xl leading-none">₹{price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-xs font-medium leading-none mb-[2px]">₹{cuttedPrice.toLocaleString()}</span>
                    <span className="text-[10px] text-primary-green font-bold uppercase tracking-wide mb-[1px]">{getDiscount(price, cuttedPrice)}%&nbsp;OFF</span>
                </div>
                {/* <!-- price container --> */}
                
                {/* <!-- CTA Button --> */}
                <Link to={`/product/${_id}`} className="w-full mt-3">
                    <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium text-sm hover:border-[#ff7a00] hover:text-[#ff7a00] hover:bg-[#ff7a00]/10 hover:shadow-[0_0_15px_rgba(255,122,0,0.15)] transition-all duration-300 active:scale-[0.98]">
                        View Overview
                    </button>
                </Link>
            </div>
            {/* <!-- product description --> */}

            {/* <!-- wishlist badge --> */}
            <span onClick={addToWishlistHandler} className={`absolute top-5 right-5 p-1.5 rounded-full backdrop-blur-md bg-black/20 border transition-all duration-300 z-20 hover:scale-110 active:scale-95 cursor-pointer ${itemInWishlist ? "text-red-500 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "text-gray-400 border-white/5 hover:text-[#ff7a00] hover:border-[#ff7a00]/50"}`}>
                <FavoriteIcon sx={{ fontSize: "18px" }} />
            </span>
            {/* <!-- wishlist badge --> */}

        </div>
    );
};

export default Product;
