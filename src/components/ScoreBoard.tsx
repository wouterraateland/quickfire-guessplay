
import React from 'react';
import { motion } from 'framer-motion';
import { Team } from '@/lib/gameData';

interface ScoreBoardProps {
  teams: Team[];
  currentTeam: string;
  round: number;
  totalRounds: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  teams, 
  currentTeam, 
  round, 
  totalRounds 
}) => {
  // Sort teams by score (highest first)
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-game-text">Scoreboard</h2>
        <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
          Round {round} of {totalRounds}
        </div>
      </div>
      
      <div className="space-y-3">
        {sortedTeams.map((team) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between p-3 rounded-lg ${
              team.id === currentTeam 
                ? `${team.color} border-2 border-black/10` 
                : 'bg-gray-100'
            }`}
          >
            <span className={`font-medium ${team.id === currentTeam ? 'text-white' : ''}`}>
              {team.name}
            </span>
            <span className={`text-lg font-bold ${team.id === currentTeam ? 'text-white' : 'text-game-text'}`}>
              {team.score}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
