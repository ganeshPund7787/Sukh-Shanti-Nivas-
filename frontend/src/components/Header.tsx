import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-purple-600 py-4 px-5">
      <div className="container mx-auto px-5 flex justify-between">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to={"/"}>SukhShantiNivas.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to={'/my-hotels'}>Mt Hotels</Link>
              <Link to={'/my-Bookings'}>My Bookings</Link>
              <button type="button">Log out</button>
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-purple-600 hover:px-3 hover:text-white hover:animate-bounce bg-white px-3 font-bold hover:bg-gray-400"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
