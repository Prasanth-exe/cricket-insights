import React, { useState, useEffect } from "react";

// Dynamically import all images
const imageModules = import.meta.glob("/src/assets/images/*.{jpg,jpeg,png}", {
  eager: true,
});

const slides = Object.keys(imageModules)
  .sort()
  .map((path, index) => ({
    src: imageModules[path].default,
    alt: `Image ${index + 1}`,
  }));

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides.length) {
    return <p className="text-red-500">Images not found!!</p>;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center mt-6">
      <img
        src={slides[currentIndex].src}
        alt={slides[currentIndex].alt}
        className="object-contain"
        style={{
          maxWidth: "90%",
          maxHeight: "500px",
        }}
      />
    </div>
  );
};

export default ImageSlider;
