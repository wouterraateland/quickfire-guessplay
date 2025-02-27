
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "QuickFire" }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 mb-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Clock className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-4xl font-bold text-game-text tracking-tight">
            {title}
          </h1>
        </div>
        <p className="text-center text-game-muted-text mt-2">
          Describe, Guess, Win!
        </p>
      </div>
    </motion.header>
  );
};

export default Header;
