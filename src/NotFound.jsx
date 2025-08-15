import React from "react";
import { Link } from "react-router-dom"; // Optional: if you're using react-router

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center px-6 py-12">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-white">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
