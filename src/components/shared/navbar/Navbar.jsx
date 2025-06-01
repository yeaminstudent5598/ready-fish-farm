import { FaPhoneAlt, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {

   const links = (<>
  <Link to="/fish&seafoods" className="flex items-center gap-2"><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf18d8f810.png" alt="" />fish & seafood</Link>
  <Link to="/steaks/fillets" className="flex items-center gap-2"><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf552cd4ed.png" alt="" />Steaks fillets</Link>
  <Link to="/chickenAndDuck" className="flex items-center gap-2 "><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf552c6fc6.png" alt="" />chicken & Duck</Link>
  <h2 className="flex items-center gap-2 "><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf55295a87.png" alt="" />Beef & Mutton</h2>
  <h2 className="flex items-center gap-2 "><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf55288919.png" alt="" />Combo Pack</h2>
  <h2 className="flex items-center gap-2 "><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf55259813.png" alt="" />Dried Fish</h2>
  <h2 className="flex items-center gap-2 "><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf55252c9c.png" alt="" />Marinated & Cooked</h2>
  <h2 className="flex items-center gap-2"><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf551db049.png" alt="" />Pasta Spice</h2>
  <h2 className="flex items-center gap-2"><img className="h-6" src="https://api.freshtoday.com.bd/media/64edf551d7bf9.png" alt="" />Fruit & Veggies</h2>
  </>
);

    return (
        <nav className="p-6">
            <div className="bg-[#40a944] text-white flex justify-between gap-4  p-1 rounded-xl">
                <div className="flex items-center gap-1"><h2 className="flex items-center gap-1"><FaPhoneAlt /> +8801641801705 | </h2>
                <h2 className="flex items-center gap-1"><IoIosMail /> hossainhridoy384@gmail.com</h2></div>

<div>                <h2 className="">CAMPAIGN | WISHLIST</h2>
</div>
            </div>

            <div className="flex justify-between items-center gap-4 mt-10">
                <Link><img className="h-20 w-20" src="https://api.freshtoday.com.bd/media/662352c69f04c.png" alt="" /></Link>
    <div className="flex w-[70%]">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search.."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          autoComplete="off"
        />
      </div>
      <button
        disabled
        className="px-8 py-2 bg-[#40a944] text-white rounded-r-lg hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>

<div className="flex gap-4">
    <h2 className="text-2xl rounded-full border p-2"><FaShoppingCart /> </h2> 
<h2 className="text-2xl rounded-full border p-2"><FaUser /></h2> 
</div>
            </div>

            <div className="grid text-[14px] grid-cols-7 text-[#497954] shadow-2xl p-2 rounded-sm items-center gap-4 mt-10">
{links}
            </div>
        </nav>
    );
};

export default Navbar;