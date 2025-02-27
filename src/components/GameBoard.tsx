
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Card from './Card';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import GameControls from './GameControls';
import TeamSelector from './TeamSelector';
import { 
  GameState, 
  GameStatus,
  initGameState, 
  startRound, 
  markWordAsCorrect, 
  skipWord, 
  endRound, 
  pauseGame, 
  resumeGame,
  getWinners
} from '@/lib/gameLogic';
import { teams as allTeams, categories } from '@/lib/gameData';

const GameBoard: React.FC = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Initialize game setup
  useEffect(() => {
    if (!gameState) {
      // Start in setup mode
      setGameState(initGameState([], 3, 30, 5, []));
    }
  }, [gameState]);
  
  // Handle team selection
  const handleToggleTeam = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };
  
  // Handle setup completion
  const handleSetupComplete = () => {
    if (selectedTeams.length < 2) {
      toast({
        title: "Not enough teams",
        description: "Please select at least 2 teams to play",
        variant: "destructive"
      });
      return;
    }
    
    // Initialize game with selected teams
    setGameState(initGameState(
      selectedTeams, 
      3, // rounds
      30, // seconds per round
      5, // words per round
      selectedCategories
    ));
    
    // Set initial timer value
    setTimeRemaining(30);
    
    // Update game status to ready
    setGameState(prev => prev ? { ...prev, status: 'ready' } : null);
  };
  
  // Start a new round
  const handleStartRound = () => {
    if (!gameState) return;
    
    setGameState(startRound(gameState));
    toast({
      title: `${gameState.currentTeam}'s Turn`,
      description: "Describe the words without saying them!",
    });
  };
  
  // Mark word as correct
  const handleCorrectWord = () => {
    if (!gameState) return;
    
    setGameState(markWordAsCorrect(gameState));
  };
  
  // Skip the current word
  const handleSkipWord = () => {
    if (!gameState) return;
    
    setGameState(skipWord(gameState));
  };
  
  // Handle time up
  const handleTimeUp = () => {
    if (!gameState) return;
    
    toast({
      title: "Time's up!",
      description: `${gameState.currentTeam} got ${gameState.correctWords.length} correct answers!`,
    });
    
    setGameState(endRound(gameState));
  };
  
  // Pause the game
  const handlePauseGame = () => {
    if (!gameState) return;
    
    setGameState(pauseGame(gameState));
  };
  
  // Resume the game
  const handleResumeGame = () => {
    if (!gameState) return;
    
    setGameState(resumeGame(gameState));
  };
  
  // Reset the game
  const handleResetGame = () => {
    setSelectedTeams([]);
    setSelectedCategories([]);
    setGameState(null);
  };
  
  // Get team color for the current team
  const getCurrentTeamColor = (): string => {
    if (!gameState) return '';
    
    const team = allTeams.find(t => t.id === gameState.currentTeam);
    return team ? team.color : '';
  };
  
  // Get filtered teams array with scores
  const getTeamsWithScores = () => {
    if (!gameState) return [];
    
    return allTeams
      .filter(team => selectedTeams.includes(team.id))
      .map(team => ({
        ...team,
        score: gameState.teamScores[team.id] || 0
      }));
  };
  
  // Render the game results
  const renderGameResults = () => {
    if (!gameState || gameState.status !== 'finished') return null;
    
    const winners = getWinners(gameState);
    const winningTeams = allTeams.filter(team => winners.includes(team.id));
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <h2 className="text-3xl font-bold mb-6">Game Over!</h2>
        
        {winningTeams.length === 1 ? (
          <>
            <div className={`inline-block px-6 py-3 rounded-lg mb-6 ${winningTeams[0].color}`}>
              <span className="text-xl font-bold text-white">
                {winningTeams[0].name} Wins!
              </span>
            </div>
            <p className="text-lg mb-8">
              with {gameState.teamScores[winningTeams[0].id]} points
            </p>
          </>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xl font-bold text-game-text">
                It's a Tie!
              </span>
            </div>
            <div className="flex justify-center space-x-4 mb-8">
              {winningTeams.map(team => (
                <div
                  key={team.id}
                  className={`px-4 py-2 rounded-lg ${team.color}`}
                >
                  <span className="font-medium text-white">
                    {team.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-lg mb-8">
              with {gameState.teamScores[winningTeams[0].id]} points each
            </p>
          </>
        )}
      </motion.div>
    );
  };
  
  // Render the setup screen
  const renderSetupScreen = () => {
    return (
      <div className="py-8">
        <TeamSelector
          teams={allTeams}
          selectedTeams={selectedTeams}
          onToggleTeam={handleToggleTeam}
          onContinue={handleSetupComplete}
        />
        
        <div className="mt-8 text-center">
          <h3 className="text-xl font-medium mb-4">Game Settings</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-game-muted-text mb-2">Categories (Optional)</h4>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {categories.map(category => (
                <button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategories(prev => 
                      prev.includes(category.name)
                        ? prev.filter(c => c !== category.name)
                        : [...prev, category.name]
                    );
                  }}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    selectedCategories.includes(category.name)
                      ? category.color + ' text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-game-muted-text mt-2">
              {selectedCategories.length === 0
                ? "All categories will be included"
                : `Selected: ${selectedCategories.join(', ')}`}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the game board based on status
  const renderGameBoard = () => {
    if (!gameState || gameState.status === 'setup') {
      return renderSetupScreen();
    }
    
    if (gameState.status === 'finished') {
      return renderGameResults();
    }
    
    const currentWord = gameState.words[gameState.currentWordIndex];
    const isPlaying = gameState.status === 'playing';
    
    return (
      <div className="py-4">
        <ScoreBoard
          teams={getTeamsWithScores()}
          currentTeam={gameState.currentTeam}
          round={gameState.currentRound}
          totalRounds={gameState.totalRounds}
        />
        
        <Timer
          initialTime={gameState.timePerRound}
          isRunning={isPlaying}
          onTimeUp={handleTimeUp}
          timeRemaining={timeRemaining}
          setTimeRemaining={setTimeRemaining}
        />
        
        <AnimatePresence mode="wait">
          {currentWord && (
            <Card
              key={currentWord.word}
              word={currentWord}
              isActive={isPlaying}
              onCorrect={handleCorrectWord}
              onSkip={handleSkipWord}
            />
          )}
        </AnimatePresence>
        
        <GameControls
          gameStatus={gameState.status}
          onStart={handleStartRound}
          onPause={handlePauseGame}
          onResume={handleResumeGame}
          onReset={handleResetGame}
          onFinish={handleResetGame}
          currentTeam={gameState.currentTeam}
          teamColor={getCurrentTeamColor()}
        />
        
        {(gameState.status === 'ready' || gameState.status === 'paused') && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
            {gameState.correctWords.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-sm text-game-muted-text mb-2">Correct Words:</h3>
                <div className="flex flex-wrap gap-2">
                  {gameState.correctWords.map(word => (
                    <span key={word} className="px-2 py-1 bg-game-green text-white text-xs rounded-full">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {gameState.skippedWords.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-game-muted-text mb-2">Skipped Words:</h3>
                <div className="flex flex-wrap gap-2">
                  {gameState.skippedWords.map(word => (
                    <span key={word} className="px-2 py-1 bg-gray-200 text-game-text text-xs rounded-full">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4">
      {renderGameBoard()}
    </div>
  );
};

export default GameBoard;
