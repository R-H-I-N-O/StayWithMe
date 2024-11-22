import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import HeroCarousel from "./HeroCarousel"
const HomeHeader = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="relative">
      <div className="px-12 pt-24">
            <HeroCarousel/>
      </div>
      <div className="container px-8 flex justify-between absolute z-10 top-6">
        <span className="text-3xl text-black font-bold tracking-tight">
          <Link to="/">StayWithMe</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to={"/my-bookings"}
                className="flex items-center px-3 font-bold text-black hover:bg-blue-600"
              >
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="flex items-center px-3 font-bold text-black hover:bg-blue-600"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to="/registration"
                className="flex items-center bg-black rounded-xl text-white px-3 font-bold hover:bg-grey-600 mx-6"
              >
                Sign Up
              </Link>
              <Link
                to="/sign-in"
                className="flex items-center bg-black rounded-xl text-white px-3 font-bold hover:bg-grey-600 mx-6"
              >
                Sign In
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default HomeHeader;
