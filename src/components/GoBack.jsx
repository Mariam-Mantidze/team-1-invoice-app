import Arrowleft from "/assets/icon-arrow-left.svg";
import { Link } from "react-router-dom";

export default function GoBack() {
  return (
    <Link to="/" className="flex items-center gap-4 cursor-pointer">
      <img src={Arrowleft} alt="left arrow icon" />
      <p className="text-gray-900 text-lg font-bold leading-tight tracking-tight">
        Go back
      </p>
    </Link>
  );
}
