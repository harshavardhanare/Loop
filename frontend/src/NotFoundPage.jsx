import React from "react";
import { Link } from "react-router-dom";
import assesifyLogo from "../src/Landing/src/assets/images/cursor.png";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center gap-0">
        <img src={assesifyLogo} alt="Assesify Logo" className="w-24 mb-6" />
        <p className="text-violet-600 mt-[-1rem] font-bold font-serif">
          Loop
        </p>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-violet-600 text-white rounded-md shadow-md hover:bg-violet-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
