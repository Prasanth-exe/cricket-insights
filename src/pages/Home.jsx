import React, { useState, useEffect } from "react";
import ImageSlider from "../ImageSlider";

function HomePage() {
  const [username, setUsername] = useState("");
  const [storedName, setStoredName] = useState(null);

  useEffect(() => {
    const nameFromStorage = JSON.parse(localStorage.getItem("name"));
    if (nameFromStorage) {
      setStoredName(nameFromStorage);
    }
  }, []);

  const handleClick = () => {
    localStorage.setItem("name", JSON.stringify(username));
    setStoredName(username);
  };

  if (!storedName) {
    return (
      <div className="max-w-7xl mx-auto md:px-16 px-4 pt-6">
        <label htmlFor="username" className="block mb-2 text-2xl font-semibold">
          Enter your name?
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2 mr-2"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    );
  } else {
    return (
      <div className="max-w-7xl mx-auto md:px-16 px-4 pt-10">
        <h1 className="text-3xl font-bold">
          <span className="text-black">Welcome,</span>{" "}
          <span className="text-blue-500">{storedName}!</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          <strong>Cricket Insights</strong> is a simple app where you can
          explore player stats, visualize their strengths in radar charts, and
          even compare players side by side.
          <br />
          <br />
          Please note: all the data here is{" "}
          <span className="font-semibold">static </span>
          and doesn’t represent live or current match values. This project is
          just a starting point — in the future, we’ll bring in live data, more
          players, and deeper analytics!
        </p>

        {/* Slider section */}
        <div className="w-full">
          <ImageSlider />
        </div>
      </div>
    );
  }
}

export default HomePage;
