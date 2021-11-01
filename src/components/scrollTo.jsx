import React from 'react';
import { useEffect, useState } from 'react'


 const ScrollTo = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={` scrolltotop ${isVisible ? 'visible' : ''}`}>
      <button

        type='button'
        onClick={ScrollToTop}
        
      >
UP
      </button>
    </div>
  );
};
export default ScrollTo