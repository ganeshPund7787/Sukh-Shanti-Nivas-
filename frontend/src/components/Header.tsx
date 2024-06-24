import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LogOutBtn from "./LogOut";
import { IoMdOptions } from "react-icons/io";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-purple-600 py-4 px-5">
      <div className="container mx-auto px-5 flex justify-between">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to={"/"}>SukhShantiNivas.com</Link>
        </span>

        <div className="hidden md:block">
          <span className="flex space-x-2 md:block">
            {isLoggedIn ? (
              <div className="flex gap-3">
                <Link
                  className="flex items-center text-white py-1 px-3 font-bold hover:bg-purple-400"
                  to={"/my-hotels"}
                >
                  Mt Hotels
                </Link>
                <Link
                  className="flex items-center text-white py-1 px-3 font-bold hover:bg-purple-400"
                  to={"/my-Bookings"}
                >
                  My Bookings
                </Link>
                <LogOutBtn />
              </div>
            ) : (
              <Link
                to={"/sign-in"}
                className="flex items-center text-purple-600 hover:px-3 hover:text-white bg-white px-3 font-bold hover:bg-gray-400"
              >
                Sign In
              </Link>
            )}
          </span>
        </div>

        <div className="dropdown bg-white rounded-full hover:bg-gray-400 dropdown-left md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn hover:bg-gray-400 text-black bg-white "
          >
            <IoMdOptions size={20} />
          </div>
          {isLoggedIn ? (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link to={"/my-hotels"}>My Hotels</Link>
              </li>
              <li>
                <Link to={"/my-Bookings"}>My Bookings</Link>
              </li>
              <li>
                <p>
                  <LogOutBtn />
                </p>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link
                  to={"/sign-in"}
                  className="flex items-center text-purple-600 hover:px-3 hover:text-white bg-white px-3 font-bold hover:bg-gray-400"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
