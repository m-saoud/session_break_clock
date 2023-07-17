import { useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(`${sessionLength}:00`);
  const [isRunning, setIsRunning] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session");
  const beepRef = useRef(null);

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
          if (timerLabel === "Session") {
            setTimerLabel("Break");
            setTimeLeft(`${breakLength}:00`);
          } else {
            setTimerLabel("Session");
            setTimeLeft(`${sessionLength}:00`);
          }
          beepRef.current.play();
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, timeLeft, breakLength, sessionLength, timerLabel]);

  const startStopTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(`${sessionLength}:00`);
    setIsRunning(false);
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
  };
  const decrement = (type) => {
    if (type === "break" && breakLength > 1) {
      setBreakLength(breakLength - 1);
    } else if (type === "session" && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(`${sessionLength - 1}:00`);
    }
  };

  const increment = (type) => {
    if (type === "break" && breakLength < 60) {
      setBreakLength(breakLength + 1);
    } else if (type === "session" && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(`${sessionLength + 1}:00`);
    }
  };
  const timerClassName =
    parseInt(timeLeft.split(":")[0]) === 0 &&
    parseInt(timeLeft.split(":")[1]) < 60
      ? "last-minute"
      : "";

  return (
    <div>
      <h1>25 + 5 Clock</h1>

      <div className="setting">
        <h2 id="break-label">Break Length</h2>
        <div className="controls">
          <button id="break-decrement" onClick={() => decrement("break")}>
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => increment("break")}>
            +
          </button>
        </div>
      </div>

      <div className="setting">
        <h2 id="session-label">Session Length</h2>
        <div className="controls">
          <button id="session-decrement" onClick={() => decrement("session")}>
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => increment("session")}>
            +
          </button>
        </div>
      </div>

      <div id="timer">
        <h2 id="timer-label">Session</h2>
        <div id="time-left" className={timerClassName}>
          {timeLeft}
        </div>
        <audio
          id="beep"
          ref={beepRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          preload="auto"
        ></audio>
      </div>

      <div id="controls">
        <button id="start-stop" onClick={startStopTimer}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
