import React, { useState, useEffect } from "react";
import "./PomodoroClock.css"; // Import the CSS file

const PomodoroClock = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [cycles, setCycles] = useState(2);
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [inputWorkMinutes, setInputWorkMinutes] = useState(25);
  const [inputBreakMinutes, setInputBreakMinutes] = useState(5);
  const [inputCycles, setInputCycles] = useState(2);

  useEffect(() => {
    setWorkMinutes(inputWorkMinutes);
    setBreakMinutes(inputBreakMinutes);
    setCycles(inputCycles);
  }, [inputWorkMinutes, inputBreakMinutes, inputCycles]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (isWorking) {
          if (workSeconds > 0) {
            setWorkSeconds(workSeconds - 1);
          } else if (workMinutes > 0) {
            setWorkMinutes(workMinutes - 1);
            setWorkSeconds(59);
          } else {
            clearInterval(interval);
            setIsWorking(false);
            setBreakMinutes(inputBreakMinutes);
            setBreakSeconds(0);
            setIsRunning(true);
          }
        } else {
          if (breakSeconds > 0) {
            setBreakSeconds(breakSeconds - 1);
          } else if (breakMinutes > 0) {
            setBreakMinutes(breakMinutes - 1);
            setBreakSeconds(59);
          } else {
            clearInterval(interval);
            setIsWorking(true);
            if (cycles > 1) {
              setCycles(cycles - 1);
              setWorkMinutes(inputWorkMinutes);
              setWorkSeconds(0);
            } else {
              setCycles(inputCycles);
              setWorkMinutes(inputWorkMinutes);
              setWorkSeconds(0);
            }
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    workMinutes,
    workSeconds,
    breakMinutes,
    breakSeconds,
    isRunning,
    isWorking,
    inputBreakMinutes,
    inputWorkMinutes,
    cycles,
    inputCycles,
  ]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorking(true);
    setCycles(inputCycles);
    setWorkMinutes(inputWorkMinutes);
    setWorkSeconds(0);
    setBreakMinutes(inputBreakMinutes);
    setBreakSeconds(0);
  };

  const handleWorkInputChange = (e) => {
    setInputWorkMinutes(parseInt(e.target.value, 10));
  };

  const handleBreakInputChange = (e) => {
    setInputBreakMinutes(parseInt(e.target.value, 10));
  };

  const handleCyclesInputChange = (e) => {
    setInputCycles(parseInt(e.target.value, 10));
  };

  const formatTime = (minutes, seconds) => {
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <div className="pomodoro-clock">
      <h1 className="title">Pomodoro Clock</h1>
      <div className="timer">
        <span className="time">
          {isWorking
            ? formatTime(workMinutes, workSeconds)
            : formatTime(breakMinutes, breakSeconds)}
        </span>
      </div>
      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="inputs">
        <div>
          <label htmlFor="workMinutesInput">Work Minutes:</label>
          <input
            type="number"
            id="workMinutesInput"
            min="1"
            value={inputWorkMinutes}
            onChange={handleWorkInputChange}
          />
        </div>
        <div>
          <label htmlFor="breakMinutesInput">Break Minutes:</label>
          <input
            type="number"
            id="breakMinutesInput"
            min="1"
            value={inputBreakMinutes}
            onChange={handleBreakInputChange}
          />
        </div>
        <div>
          <label htmlFor="cyclesInput">Cycles:</label>
          <input
            type="number"
            id="cyclesInput"
            min="1"
            value={inputCycles}
            onChange={handleCyclesInputChange}
          />
        </div>
      </div>
      <div className="cycles">Cycles Left: {cycles}</div>
    </div>
  );
};

export default PomodoroClock;
