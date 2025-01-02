import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export default function CountdownTimer() {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds(time => time - 1);
      }, 1000);
    } else if (timeInSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeInSeconds]);

  const startTimer = (e: React.FormEvent) => {
    e.preventDefault();
    const minutes = parseInt(inputMinutes);
    if (minutes > 0) {
      setTimeInSeconds(minutes * 60);
      setIsRunning(true);
      setInputMinutes('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setTimeInSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Timer className="w-5 h-5 mr-2" />
        Countdown Timer
      </h3>
      <div className="text-3xl font-mono text-center mb-4">
        {formatTime(timeInSeconds)}
      </div>
      <form onSubmit={startTimer} className="mb-4">
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
          placeholder="Enter minutes"
          className="w-full px-3 py-2 border rounded-md mb-2"
          min="1"
          disabled={isRunning}
        />
      </form>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={timeInSeconds === 0}
          className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={reset}
          className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}