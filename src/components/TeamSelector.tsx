
import React from 'react';
import { motion } from 'framer-motion';
import { Team } from '@/lib/gameData';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeams: string[];
  onToggleTeam: (teamId: string) => void;
  onContinue: () => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ 
  teams, 
  selectedTeams, 
  onToggleTeam,
  onContinue
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Select Teams</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {teams.map(team => (
          <motion.button
            key={team.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggleTeam(team.id)}
            className={`py-4 px-6 rounded-lg transition-all duration-200 ${
              selectedTeams.includes(team.id) 
                ? team.color 
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <span className="font-medium">{team.name}</span>
          </motion.button>
        ))}
      </div>
      
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          disabled={selectedTeams.length < 2}
          className={`game-button px-8 py-3 bg-primary text-white font-medium ${
            selectedTeams.length < 2 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue
        </motion.button>
        
        {selectedTeams.length < 2 && (
          <p className="text-sm text-game-muted-text mt-2">
            Please select at least 2 teams
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default TeamSelector;
