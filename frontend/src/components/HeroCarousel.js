import React, { useState, useEffect, useRef } from "react";
import { Galleria } from "primereact/galleria";

export default function AdvancedDemo() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);

  const galleria = useRef(null);

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    // Set images data when the component mounts
    setImages([
      { itemImageSrc: "./hero1.jpg", thumbnailImageSrc: "./hero1.jpg", alt: "Hero 1", title: "Hero Image 1" },
      { itemImageSrc: "./hero2.jpg", thumbnailImageSrc: "./hero2.jpg", alt: "Hero 2", title: "Hero Image 2" },
      { itemImageSrc: "./hero3.jpg", thumbnailImageSrc: "./hero3.jpg", alt: "Hero 3", title: "Hero Image 3" },
      { itemImageSrc: "./hero4.jpg", thumbnailImageSrc: "./hero4.jpg", alt: "Hero 4", title: "Hero Image 4" },
      { itemImageSrc: "./hero5.jpg", thumbnailImageSrc: "./hero5.jpg", alt: "Hero 5", title: "Hero Image 5" },
      { itemImageSrc: "./hero6.jpg", thumbnailImageSrc: "./hero6.jpg", alt: "Hero 6", title: "Hero Image 6" },
      { itemImageSrc: "./her07.jpg", thumbnailImageSrc: "./hero7.jpg", alt: "Hero 7", title: "Hero Image 7" },
      { itemImageSrc: "./hero8.jpg", thumbnailImageSrc: "./hero8.jpg", alt: "Hero 8", title: "Hero Image 8" },
    ]);
  }, []);

  const onItemChange = (event) => {
    setActiveIndex(event.index);
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      closeFullScreen();
    } else {
      openFullScreen();
    }
  };

  const onFullScreenChange = () => {
    setFullScreen((prevState) => !prevState);
  };

  const openFullScreen = () => {
    const elem = document.querySelector(".galleria-demo");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen(); // Firefox
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(); // Chrome, Safari & Opera
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen(); // IE/Edge
    }
  };

  const closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const thumbnailTemplate = (item) => {
    return (
      <div className="grid grid-nogutter justify-content-center">
        <img
          src={item.thumbnailImageSrc}
          alt={item.alt}
          style={{ display: "block", height: "auto" }}
          className="w-full"
        />
      </div>
    );
  };

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        className="object-cover w-full h-[400px] rounded-2xl"
      />
    );
  };

  return (
    <div className="card galleria-demo">
      <Galleria
        ref={galleria}
        value={images}
        activeIndex={activeIndex}
        onItemChange={onItemChange}
        showThumbnails={showThumbnails}
        numVisible={5}
        circular
        autoPlay
        transitionInterval={4000}
        responsiveOptions={responsiveOptions}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        style={{ maxWidth: "full" }}
      />
    </div>
  );
}
