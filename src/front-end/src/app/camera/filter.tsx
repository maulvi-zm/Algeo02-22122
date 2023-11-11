import React, { useState, useEffect } from "react";

function Filter() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          return 5;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`absolute w-[512px] h-[512px] bg-black bg-opacity-30 z-10 flex justify-center items-center rounded-xl ${
        count === 0 ? "hidden" : null
      }`}
    >
      <p className={`text-center text-white font-bold text-[72px]`}>{count}</p>
    </div>
  );
}

export default Filter;
