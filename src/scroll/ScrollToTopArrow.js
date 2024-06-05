import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowUp,
    faSquareUp,
    faLocationDot,
  } from '@fortawesome/free-solid-svg-icons'

function ScrollToTopArrow() {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`arrow-container${visible ? " visible" : ""}`}
      onClick={scrollToTop}
    >
        <div className="scrollarrow">
      <FontAwesomeIcon
        icon={faArrowUp}
        className="scroll1S"
        style={{ color: 'white' }}
        />
        </div>
    </div>
  );
}

export default ScrollToTopArrow;
