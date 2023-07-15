import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(`${sessionLength}:00`);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        const [minutes, seconds] = timeLeft.split(":");
        let totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);

        if (totalSeconds > 0) {
          totalSeconds--;
          const newMinutes = Math.floor(totalSeconds / 60);
          const newSeconds = totalSeconds % 60;
          setTimeLeft(
            `${newMinutes.toString().padStart(2, "0")}:${newSeconds
              .toString()
              .padStart(2, "0")}`
          );
        } else {
          clearInterval(timerInterval);
          // Handle timer completion logic here
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, timeLeft]);
  
  const startStopTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(`${sessionLength}:00`);
    setIsRunning(false);

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
      setSessionLength(sessionLength - 1);
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
          <button id="break-increment" onClick={incrementBreakLength}>
            +
          </button>
        </div>
      </div>

      <div className="setting">
        <h2 id="session-label">Session Length</h2>
        <div className="controls">
          <button id="session-decrement" onClick={decrementSessionLength}>
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={incrementSessionLength}>
            +
          </button>
        </div>
      </div>

      <div id="timer">
        <h2 id="timer-label">Session</h2>
        <div id="time-left">{timeLeft}</div>
      </div>

      <div id="controls">
        <button id="start-stop" onClick={startStopTimer}>{isRunning ? 'Stop' : 'Start'}</button>
        <button id="pause">Pause</button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
