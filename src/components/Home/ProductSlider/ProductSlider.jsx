import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import Product from './Product';

const ProductSlider = ({ title, tagline }) => {

    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className="w-full overflow-hidden p-8 md:p-10 bg-[var(--color-bg-secondary)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] mb-12 border border-gray-800 bg-opacity-70 backdrop-blur-md">
            {/* <!-- header --> */}
            <div className="flex mb-6 justify-between items-center">
                <div className="title flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-wide text-white">{title}</h1>
                    <p className="text-sm text-gray-400 font-medium">{tagline}</p>
                </div>
                <Link to="/products" className="text-sm font-medium uppercase px-5 py-2 btn-primary rounded-lg">view all</Link>
            </div>
            {loading ? null :
                <Slider {...settings} className="flex items-center justify-between p-1">
                    {products && getRandomProducts(products, 12).map((product) => (
                        <Product {...product} key={product._id} />
                    ))}
                </Slider>
            }

        </section>
    );
};

export default ProductSlider;
