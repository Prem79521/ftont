import { getDiscount } from '../../../utils/functions';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

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
        <div className="flex flex-col items-center gap-2 px-3 py-6 mx-3 my-2 relative bg-[#222222] border border-gray-800 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,106,0,0.5)] group">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center text-center">
                <div className="w-36 h-36 transform group-hover:scale-110 transition-transform duration-300 ease-out">
                    <img draggable="false" className="w-full h-full object-contain drop-shadow-sm" src={images[0].url} alt={name} />
                </div>
                <h2 className="text-sm mt-4 text-gray-200 group-hover:text-[var(--color-primary)] transition-colors">{name.length > 50 ? `${name.substring(0, 50)}...` : name}</h2>
            </Link>
            {/* <!-- image & product title --> */}

            {/* <!-- product description --> */}
            <div className="flex flex-col gap-2 items-center">
                {/* <!-- rating badge --> */}
                <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} /></span>
                    <span>({numOfReviews.toLocaleString()})</span>
                </span>
                {/* <!-- rating badge --> */}

                {/* <!-- price container --> */}
                <div className="flex items-center gap-1.5 text-md font-medium">
                    <span>₹{price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-xs">₹{cuttedPrice.toLocaleString()}</span>
                    <span className="text-xs text-primary-green">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                </div>
                {/* <!-- price container --> */}
            </div>
            {/* <!-- product description --> */}

            {/* <!-- wishlist badge --> */}
            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} absolute top-5 right-2 cursor-pointer`}><FavoriteIcon sx={{ fontSize: "16px" }} /></span>
            {/* <!-- wishlist badge --> */}

        </div>
    );
};

export default Product;
