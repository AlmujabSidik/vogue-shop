import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { Separator } from "./ui/separator";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-12 container max-w-full px-4 md:px-4 lg:px-0 lg:max-w-6xl mx-auto flex items-center justify-between">
      {/* Brand */}
      <Link to={"/"}>
        <img src={logo} className="w-16" alt="logo vogue" />
      </Link>
      {/* Search Bar */}
      <div className="w-full flex justify-end mr-10">
        <Input className="max-w-prose" placeholder="Search product..." />
      </div>
      {/* Menu */}
      <div className="flex space-x-4 h-6 items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button size="icon" variant="ghost">
              <IoCartOutline className="h-5 w-5" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost">
            <IoHeartOutline className="h-5 w-5" />
          </Button>
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="flex space-x-2">
          <Link to={"/login"}>
            <Button size="sm">Sign In</Button>
          </Link>
          <Button variant="outline" size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};
