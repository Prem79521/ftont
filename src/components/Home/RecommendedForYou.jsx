import { useRef } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';

const dummyData = [
  { _id: '1', name: 'Premium Wireless Headphones XT with ANC', price: 2999, cuttedPrice: 5999, ratings: 4.5, numOfReviews: 1204, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { _id: '2', name: 'Minimalist Smart Watch V2 - Pro Edition', price: 4500, cuttedPrice: 8990, ratings: 4.8, numOfReviews: 893, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80' },
  { _id: '3', name: 'Ergonomic Gaming Mouse Ultra', price: 1290, cuttedPrice: 2490, ratings: 4.2, numOfReviews: 450, image: 'https://images.unsplash.com/photo-1527814050087-1563f03a6bc9?w=500&q=80' },
  { _id: '4', name: 'Mechanical Keyboard Pro RGB', price: 5400, cuttedPrice: 9999, ratings: 4.7, numOfReviews: 2100, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80' },
  { _id: '5', name: 'Ultra-clear 4K Webcam HD', price: 3200, cuttedPrice: 6500, ratings: 4.4, numOfReviews: 320, image: 'https://images.unsplash.com/photo-1590481513715-181515250494?w=500&q=80' },
  { _id: '6', name: 'Portable Extended SSD 1TB', price: 8990, cuttedPrice: 12000, ratings: 4.9, numOfReviews: 5400, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80' },
  { _id: '7', name: 'Wireless Fast Charging Pad', price: 900, cuttedPrice: 1999, ratings: 4.1, numOfReviews: 154, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=500&q=80' },
];

const RecommendedForYou = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    const getDiscount = (price, cuttedPrice) => {
        return Math.floor(((cuttedPrice - price) / cuttedPrice) * 100);
    }

    return (
        <section className="w-full relative shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-2xl glass mb-6 overflow-hidden border border-white/5">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 opacity-90">
                <div className="flex items-center gap-3">
                    <AutoAwesomeIcon className="text-[#ff7a00]" sx={{ fontSize: "28px" }} />
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Recommended for You</h2>
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex gap-2">
                    <button onClick={scrollLeft} className="p-2 !rounded-full !bg-white/5 border border-white/10 hover:!bg-[#ff7a00] hover:!border-[#ff7a00] hover:shadow-[0_0_15px_rgba(255,122,0,0.5)] transition-all ease-out focus:outline-none flex items-center justify-center !w-10 !h-10">
                        <ArrowBackIosIcon sx={{ fontSize: "16px", paddingLeft: "4px" }} />
                    </button>
                    <button onClick={scrollRight} className="p-2 !rounded-full !bg-white/5 border border-white/10 hover:!bg-[#ff7a00] hover:!border-[#ff7a00] hover:shadow-[0_0_15px_rgba(255,122,0,0.5)] transition-all ease-out focus:outline-none flex items-center justify-center !w-10 !h-10">
                        <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div 
                ref={scrollRef} 
                className="flex items-center gap-4 overflow-x-auto px-6 py-6 hide-scrollbar scroll-smooth w-full"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {dummyData.map((item) => (
                    <div className="flex-shrink-0 w-[220px] flex flex-col gap-3 p-4 relative bg-[#131313] border border-white/5 rounded-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#ff7a00]/30 hover:shadow-[0_8px_30px_rgba(255,122,0,0.15)] group cursor-pointer" key={item._id}>
                        {/* Image */}
                        <div className="w-full h-[160px] rounded-xl overflow-hidden bg-[#1a1a1a] flex items-center justify-center p-4 border border-white/5 relative">
                            <img draggable="false" className="w-full h-full object-contain drop-shadow-md transform group-hover:scale-110 transition-transform duration-500 z-10" src={item.image} alt={item.name} />
                            <div className="absolute inset-0 bg-[#ff7a00] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl pointer-events-none filter blur-2xl"></div>
                        </div>

                        {/* Details */}
                        <div className="w-full flex flex-col gap-1.5 text-left z-10 mt-1">
                            <h3 className="text-[13px] font-medium text-gray-200 group-hover:text-[#ff7a00] transition-colors duration-300 leading-snug line-clamp-2 min-h-[38px]">
                                {item.name}
                            </h3>

                            {/* Tags/Rating */}
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-1.5 py-[1px] bg-primary-green/20 border border-primary-green/30 rounded-sm text-[10px] font-bold text-primary-green flex items-center gap-0.5">
                                    {item.ratings} <StarIcon sx={{ fontSize: "10px" }} />
                                </span>
                                <span className="text-[11px] text-gray-500 font-medium tracking-wide">({item.numOfReviews})</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-end gap-2 mt-2">
                                <span className="text-[17px] font-bold text-white tracking-tight leading-none">₹{item.price.toLocaleString()}</span>
                                <span className="text-gray-500 line-through text-[11px] font-medium leading-none mb-[1px]">₹{item.cuttedPrice.toLocaleString()}</span>
                            </div>
                            <span className="text-[9px] font-bold text-[#ff7a00] bg-[#ff7a00]/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide w-fit mt-1">
                                {getDiscount(item.price, item.cuttedPrice)}% OFF
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedForYou;
