import React, { useState, useRef, useEffect } from "react";

const Timer = () => {

  const [duration, setDuration] = useState<number | string>(""); // User set duration
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time remaining
  const [isActive, setIsActive] = useState<boolean>(false); // Is the timer active
  const [isPaused, setIsPaused] = useState<boolean>(false); // Is the timer paused

  // Reference variable for timer ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle setting the duration of the countdown
  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration); // Set the countdown timer
      setIsActive(false); // Reset active state
      setIsPaused(false); // Reset paused state
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const startTimer = () => {
    if (!isActive && !isPaused && duration) {
      setTimeLeft(Number(duration)); // Set duration initially
      setIsActive(true);
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isPaused) {
      // Resume the timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    if (isActive && !isPaused) {
      clearInterval(timerRef.current as NodeJS.Timeout); // Stop the timer
      setIsPaused(true);  // Set pause state to true
      setIsActive(true);  
    }
  };

  
  

  // Function to handle stop timer
  const stopTimer = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(0);
  };

  // Reset the timer when its zero
  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      setIsActive(false);
    }
  }, [timeLeft, isActive]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-500">

      <div className="bg-white dark:bg-white border border-gray-300 shadow-white-2xl p-6 rounded-3xl pb-2" >
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 ">Countdown Timer</h1>
  
  <div className="text-center">
      <input
        type="number" className="mb-4 text-black text-center h-8 w-64 rounded-full bg-white p-2focus:shadow-2xl text-1xl border-2 border-gray-800"
        placeholder="Set duration in (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        disabled={isActive}
      />
     <button className=" rounded-xl ml-2 h-8 w-14 bg-white p-2focus:shadow-2xl text-xl border-2 border-gray-800  bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold " onClick={handleSetDuration}> Set</button>

       {/* Display the formatted time left */}
       <div className="text-6xl font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>

       <div className="text-center text-white ml-6">
      <div>
      
        <button
  className="mr-6 bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-500 hover:to-gray-700  border-2 border-gray-800 text-white font-bold py-2 rounded-2xl focus:outline-none w-20"
  onClick={startTimer}
  disabled={isActive && !isPaused} // Disable when active and not paused
>
  {isPaused ? "Resume" : "Start"}
</button>
<button
  className="mr-6 bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-500 hover:to-gray-700  border-2 border-gray-800 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none w-20"
  onClick={pauseTimer}
  disabled={!isActive || isPaused} // Disable when not active or already paused
>
  Pause
</button>

        <button className="mr-6 bg-gradient-to-r from-gray-600 to-blue-600 border-2 border-gray-800 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-2 px-4 rounded-2xl  focus:outline-none w-20 focus:shadow-outline  " onClick={stopTimer} disabled={!isActive}>
          Reset
        </button>
      </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4  mt-4 text-gray-700 ">Time Left: {timeLeft > 0 ? timeLeft : 0} seconds</h2>
      </div>
      <h1 className=" text-center text-lg">By Yusra Saleem</h1>
    </div>
   
   </div>
  );
};

export default Timer;
