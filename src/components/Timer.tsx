
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  initialTime: number;
  isRunning: boolean;
  onTimeUp: () => void;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ 
  initialTime, 
  isRunning, 
  onTimeUp, 
  timeRemaining, 
  setTimeRemaining 
}) => {
  const intervalRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      lastUpdateTimeRef.current = Date.now();
      
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const deltaTime = (now - lastUpdateTimeRef.current) / 1000;
        lastUpdateTimeRef.current = now;
        
        setTimeRemaining(prevTime => {
          const newTime = Math.max(0, prevTime - deltaTime);
          
          if (newTime <= 0 && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            onTimeUp();
          }
          
          return newTime;
        });
      }, 100); // Update more frequently for smoother countdown
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, onTimeUp, setTimeRemaining]);

  // Reset timer when initialTime changes
  useEffect(() => {
    if (!isRunning) {
      setTimeRemaining(initialTime);
    }
  }, [initialTime, isRunning, setTimeRemaining]);

  const percentRemaining = (timeRemaining / initialTime) * 100;
  
  // Determine timer color based on time remaining
  const getTimerColor = () => {
    if (percentRemaining > 60) return 'bg-game-green';
    if (percentRemaining > 30) return 'bg-game-yellow';
    return 'bg-game-red';
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <TimerIcon className="w-5 h-5 mr-2 text-game-text" />
          <span className="font-medium text-game-text">Time Remaining</span>
        </div>
        <div className="text-xl font-bold text-game-text">
          {Math.ceil(timeRemaining)}s
        </div>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${getTimerColor()} transition-colors duration-500`}
          style={{ width: `${percentRemaining}%` }}
          animate={{ width: `${percentRemaining}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
};

export default Timer;
