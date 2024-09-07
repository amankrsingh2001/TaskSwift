import { Link } from "react-router-dom";
import Logo from "../utils/Logo"
const Header = () => {
  return (
    <header className="p-2 text-center border-2 flex justify-between gap-4 ">
      <Logo/>
      <nav className="sm:block hidden">Navigation</nav>
      <div className="flex">
        <Link
          to={"/signin"}
          className="py-1 px-4 active:scale-[96%] rounded mr-2 border-2 text-sm"
        >
          Sign In
        </Link>
        
        <Link
          to={"/signup"}
          className="hidden sm:block py-1 px-4 active:scale-[96%] rounded mr-2 border-2 text-sm"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
