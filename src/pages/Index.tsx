
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import GameBoard from '@/components/GameBoard';

const Index: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-game-background"
    >
      <Header title="QuickFire" />
      <GameBoard />
      
      <footer className="py-8 mt-16 text-center text-game-muted-text text-sm">
        <p>Describe, Guess, Win - QuickFire</p>
      </footer>
    </motion.div>
  );
};

export default Index;
