import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-purple-600 py-4">
      <div className="container mx-auto flex justify-between">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to={"/"}>SukhShantiNivas.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to={"/sign-in"}
            className="flex items-center text-purple-600 hover:px-3 hover:text-white hover:animate-bounce bg-white px-3 font-bold hover:bg-gray-400"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
