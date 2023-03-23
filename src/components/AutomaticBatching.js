import { useState } from "react";
import { flushSync } from "react-dom";

function LogEvents(props) {
  console.log("Render");
  return null;
}

function fetchSomething() {
  return new Promise((resolve) => setTimeout(resolve, 100));
}

const AutomaticBatching = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // function handleClick() {
  //   console.log("=== click ===");
  //   flushSync(() => {
  //     setCount((c) => c + 1);
  //   });
  //   // React has updated the DOM by now
  //   flushSync(() => {
  //     setFlag((f) => !f);
  //   });
  //   // React has updated the DOM by now
  // }

  function handleClick() {
    console.log("=== click ===");
    fetchSomething().then(() => {
      // React 17 and earlier does NOT batch these:
      setCount((c) => c + 1); // Causes a re-render
      setFlag((f) => !f); // Causes a re-render
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
      <LogEvents />
    </div>
  );
};

export default AutomaticBatching;
