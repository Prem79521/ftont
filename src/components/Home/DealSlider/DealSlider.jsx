import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';

export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    swipe: true,
    swipeToSlide: true,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const DealSlider = ({ title }) => {
    return (
        <section className="w-full overflow-hidden p-6 md:p-8 bg-[#1a1a1a] rounded-2xl shadow-xl mb-10 border border-gray-800 bg-opacity-70 backdrop-blur-md">
            {/* <!-- header --> */}
            <div className="flex mb-6 justify-between items-center">
                <h1 className="text-2xl font-semibold tracking-wide text-white">{title}</h1>
                <Link to="/products" className="text-sm font-medium uppercase px-5 py-2 btn-primary rounded-lg">VIEW ALL</Link>
            </div>
            {/* <!-- header --> */}

            <Slider {...settings}>
                {getRandomProducts(offerProducts, 12).map((item, i) => (
                    <Product {...item} key={i} />
                ))}
            </Slider>

        </section>
    );
};

export default DealSlider;
