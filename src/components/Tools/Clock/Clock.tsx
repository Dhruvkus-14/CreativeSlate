import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <ClockIcon className="w-5 h-5 mr-2" />
        Clock
      </h3>
      <div className="text-3xl font-mono text-center">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
}