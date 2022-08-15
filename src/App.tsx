import "./App.css";
import React, { useState } from "react";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  const [playGame, setPlayGame] = useState(false);
  const handleClick = () => {
    setPlayGame((prev) => !prev);
  };

  return (
    <div className="App">
      {playGame ? (
        <Quiz />
      ) : (
        <div className="hero">
          <h2>Quizzical</h2>
          <h4>
            Here is a quiz, you will need to choose only 1 answer.
            <br />
            The questions will be on completely different topics, but don't
            worry, at the end you can find out the correct answer 😉
          </h4>
          <button onClick={handleClick}>Play game!</button>
        </div>
      )}
    </div>
  );
};

export default App;
