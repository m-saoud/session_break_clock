import { useState } from "react";

import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(`${sessionLength}:00`);


  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(`${sessionLength}:00`);
  };
  const decrementBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const incrementBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const decrementSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
    
    }
  };
  const incrementSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  return (
    <div>
      <h1>25 + 5 Clock</h1>

      <div className="setting">
        <h2 id="break-label">Break Length</h2>
        <div className="controls">
          <button id="break-decrement" onClick={decrementBreakLength}>
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={incrementBreakLength}>+</button>
        </div>
      </div>

      <div className="setting">
        <h2 id="session-label">Session Length</h2>
        <div className="controls">
          <button id="session-decrement" onClick={decrementSessionLength}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={incrementSessionLength}>+</button>
        </div>
      </div>

      <div id="timer">
        <h2 id="timer-label">Session</h2>
        <div id="time-left">25:00</div>
      </div>

      <div id="controls">
        <button id="start-stop">Start</button>
        <button id="pause">Pause</button>
        <button id="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
