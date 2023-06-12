import React from "react";

function Home() {
  function handleHowToPlay() {
    console.log("yes");
  }
  function handleRules() {
    console.log("yes");
  }
  return (
    <div>
      <div>
        <button onClick={handleHowToPlay}>How to Play</button>
      </div>
      <div>
        <button onClick={handleRules}>Rules</button>
      </div>
    </div>
  );
}

export default Home;
