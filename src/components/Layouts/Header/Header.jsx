import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Searchbar from './Searchbar';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  return (

    <header className="glass fixed top-0 w-full z-10 !border-t-0 !border-l-0 !border-r-0 !rounded-none">

      {/* <!-- navbar container --> */}
      <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">

        {/* <!-- logo & search container --> */}
        <div className="flex items-center flex-1">
          <Link className="flex items-center gap-2 mr-1 sm:mr-4 text-white group transition-all" to="/">
            <StorefrontIcon sx={{ fontSize: "28px", color: "#ff7a00" }} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,122,0,0.5)]" />
            <span className="font-bold text-2xl tracking-widest hidden sm:block uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a00] to-[#ffba66] drop-shadow-[0_0_15px_rgba(255,122,0,0.3)]">ROWDY</span>
          </Link>

          <Searchbar />
        </div>
        {/* <!-- logo & search container --> */}

        {/* <!-- right navs --> */}
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

          {isAuthenticated === false ?
            <Link to="/login" className="px-3 sm:px-9 py-0.5 text-white border border-white/20 hover:border-[#ff7a00] hover:bg-[#ff7a00]/10 hover:shadow-[0_0_15px_rgba(255,122,0,0.3)] font-medium cursor-pointer glass transition-all duration-300 rounded-md">Login</Link>
            :
            (
              <span className="userDropDown flex items-center text-white font-medium gap-1 cursor-pointer nav-link" onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>{user.name && user.name.split(" ", 1)}
                <span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
              </span>
            )
          }

          {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}

          <span className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer nav-link" onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}>More
            <span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
          </span>

          {toggleSecondaryDropDown && <SecondaryDropDownMenu />}

          <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative nav-link">
            <span><ShoppingCartIcon /></span>
            {cartItems.length > 0 &&
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border border-white/20 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                {cartItems.length}
              </div>
            }
            Cart
          </Link>
        </div>
        {/* <!-- right navs --> */}

      </div>
      {/* <!-- navbar container --> */}
    </header>
  )
};

export default Header;
