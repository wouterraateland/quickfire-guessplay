
import React from 'react';
import { motion } from 'framer-motion';
import { WordItem } from '@/lib/gameData';

interface CardProps {
  word: WordItem;
  isActive: boolean;
  onCorrect: () => void;
  onSkip: () => void;
}

const Card: React.FC<CardProps> = ({ word, isActive, onCorrect, onSkip }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case "Movies & TV":
        return "bg-game-red";
      case "Sports":
        return "bg-game-blue";
      case "Geography":
        return "bg-game-green";
      case "Famous People":
        return "bg-game-yellow";
      default:
        return "bg-game-purple";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`game-card w-full max-w-md mx-auto ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}`}
    >
      <div className="flex flex-col items-center">
        <span className={`text-xs font-medium px-2 py-1 rounded-full mb-3 ${getCategoryBadgeColor(word.category)} ${word.category === "Famous People" ? "text-game-text" : "text-white"}`}>
          {word.category}
        </span>
        <h2 className="text-3xl font-bold text-game-text mb-6">{word.word}</h2>
        
        {isActive && (
          <div className="flex space-x-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSkip}
              className="game-button bg-gray-200 text-game-text px-6 py-2"
            >
              Skip
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCorrect}
              className="game-button bg-game-green text-white px-6 py-2"
            >
              Correct
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
