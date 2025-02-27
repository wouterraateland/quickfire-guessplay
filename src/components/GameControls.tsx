
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';
import { GameStatus } from '@/lib/gameLogic';

interface GameControlsProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onFinish: () => void;
  currentTeam: string;
  teamColor: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStatus,
  onStart,
  onPause,
  onResume,
  onReset,
  onFinish,
  currentTeam,
  teamColor
}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-center space-x-4">
        {gameStatus === 'ready' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className={`game-button ${teamColor} px-8 py-3 flex items-center`}
          >
            <Play className="w-5 h-5 mr-2" />
            <span>Start Round</span>
          </motion.button>
        )}
        
        {gameStatus === 'playing' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPause}
            className="game-button bg-game-yellow text-game-text px-8 py-3 flex items-center"
          >
            <Pause className="w-5 h-5 mr-2" />
            <span>Pause</span>
          </motion.button>
        )}
        
        {gameStatus === 'paused' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResume}
            className={`game-button ${teamColor} px-8 py-3 flex items-center`}
          >
            <Play className="w-5 h-5 mr-2" />
            <span>Resume</span>
          </motion.button>
        )}
        
        {gameStatus !== 'setup' && gameStatus !== 'finished' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="game-button bg-gray-200 text-game-text px-6 py-3 flex items-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            <span>Reset</span>
          </motion.button>
        )}
        
        {gameStatus === 'finished' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="game-button bg-primary text-white px-8 py-3 flex items-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            <span>New Game</span>
          </motion.button>
        )}
      </div>
      
      {gameStatus === 'ready' && (
        <div className="text-center mt-4">
          <p className="text-game-muted-text">
            {currentTeam}'s turn to describe!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameControls;
