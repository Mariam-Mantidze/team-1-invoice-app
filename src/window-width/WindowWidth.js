import { useState, useEffect } from "react";

const mobileBreakpoint = 768;
const tabletBreakpoint = 1440;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // handler to call on window resize
    const handleResize = () => {
      // set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // event listener
    window.addEventListener("resize", handleResize);

    // update state with initial window size
    handleResize();

    // remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const useScreenType = () => {
  const { width } = useWindowSize();

  const isMobile = width < mobileBreakpoint;
  const isTablet = width >= mobileBreakpoint && width < tabletBreakpoint;
  const isDesktop = width >= tabletBreakpoint;

  return { isMobile, isTablet, isDesktop };
};
