import mobiles from '../../assets/images/Categories/phone.png';
import fashion from '../../assets/images/Categories/fashion.png';
import electronics from '../../assets/images/Categories/electronics.png';
import home from '../../assets/images/Categories/home.png';
import travel from '../../assets/images/Categories/travel.png';
import appliances from '../../assets/images/Categories/appliances.png';
import furniture from '../../assets/images/Categories/furniture.png';
import beauty from '../../assets/images/Categories/beauty.png';
import grocery from '../../assets/images/Categories/grocery.png';
import { Link } from 'react-router-dom';

const catNav = [
    {
        name: "Mobiles",
        icon: mobiles,
    },
    {
        name: "Fashion",
        icon: fashion,
    },
    {
        name: "Electronics",
        icon: electronics,
    },
    {
        name: "Home",
        icon: home,
    },
    {
        name: "Travel",
        icon: travel,
    },
    {
        name: "Appliances",
        icon: appliances,
    },
    {
        name: "Furniture",
        icon: furniture,
    },
    {
        name: "Beauty,Toys & more",
        icon: beauty,
    },
    {
        name: "Grocery",
        icon: grocery,
    },
]

const Categories = () => {
    return (
        <section className="bg-transparent mt-16 sm:mt-8 mb-6 min-w-full overflow-hidden">

            <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-6 sm:gap-10 px-4 py-4 hide-scrollbar">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-3 items-center group min-w-[80px]" key={i}>
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full glass flex items-center justify-center p-4 group-hover:scale-105 transition-transform overflow-hidden cursor-pointer shadow-sm">
                            <img draggable="false" className="h-full w-full object-contain drop-shadow-md" src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-center text-gray-300 group-hover:text-[var(--color-primary)] transition-colors">{item.name}</span>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
