import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import notfound from "../assets/notfound.svg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-2 justify-center h-screen items-center overflow-hidden">
      <img
        src={notfound}
        className="w-full sm:max-w-screen-sm"
        alt="Not Found Image"
      />
      <Link to={"/"}>
        <Button size="sm">Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
