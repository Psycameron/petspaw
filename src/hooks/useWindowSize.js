import { useEffect, useState } from "react";

// export default function useWindowSize() {
//   const [windowSize, setWindowSize] = useState();

//   useEffect(() => {
//     window.addEventListener("resize", () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     });
//   }, []);
// }

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}