
import { WordItem, getRandomWords } from './gameData';

export type GameStatus = 'setup' | 'ready' | 'playing' | 'paused' | 'finished';

export interface GameState {
  status: GameStatus;
  currentTeam: string;
  currentRound: number;
  totalRounds: number;
  timePerRound: number;
  wordsPerRound: number;
  remainingTime: number;
  words: WordItem[];
  currentWordIndex: number;
  correctWords: string[];
  skippedWords: string[];
  teamScores: Record<string, number>;
  selectedCategories: string[];
}

// Initialize a new game state
export const initGameState = (
  teams: string[], 
  totalRounds: number = 3, 
  timePerRound: number = 30,
  wordsPerRound: number = 5,
  categories: string[] = []
): GameState => {
  return {
    status: 'setup',
    currentTeam: teams[0],
    currentRound: 1,
    totalRounds,
    timePerRound,
    wordsPerRound,
    remainingTime: timePerRound,
    words: [],
    currentWordIndex: 0,
    correctWords: [],
    skippedWords: [],
    teamScores: teams.reduce((acc, team) => ({...acc, [team]: 0}), {}),
    selectedCategories: categories,
  };
};

// Start a new round
export const startRound = (state: GameState): GameState => {
  const newWords = getRandomWords(
    state.wordsPerRound,
    state.selectedCategories.length > 0 ? state.selectedCategories[Math.floor(Math.random() * state.selectedCategories.length)] : undefined
  );
  
  return {
    ...state,
    status: 'playing',
    words: newWords,
    currentWordIndex: 0,
    correctWords: [],
    skippedWords: [],
    remainingTime: state.timePerRound
  };
};

// Mark current word as correct
export const markWordAsCorrect = (state: GameState): GameState => {
  if (state.status !== 'playing') return state;
  
  const currentWord = state.words[state.currentWordIndex];
  if (!currentWord) return state;
  
  const nextIndex = state.currentWordIndex + 1;
  const correctWords = [...state.correctWords, currentWord.word];
  
  // If we've gone through all words, stay on the last index
  const newIndex = nextIndex < state.words.length ? nextIndex : state.currentWordIndex;
  
  return {
    ...state,
    currentWordIndex: newIndex,
    correctWords
  };
};

// Skip the current word
export const skipWord = (state: GameState): GameState => {
  if (state.status !== 'playing') return state;
  
  const currentWord = state.words[state.currentWordIndex];
  if (!currentWord) return state;
  
  const nextIndex = state.currentWordIndex + 1;
  const skippedWords = [...state.skippedWords, currentWord.word];
  
  // If we've gone through all words, stay on the last index
  const newIndex = nextIndex < state.words.length ? nextIndex : state.currentWordIndex;
  
  return {
    ...state,
    currentWordIndex: newIndex,
    skippedWords
  };
};

// End the current round and update scores
export const endRound = (state: GameState): GameState => {
  const teamScores = {...state.teamScores};
  teamScores[state.currentTeam] += state.correctWords.length;
  
  // Determine the next team (cycle through teams)
  const teams = Object.keys(state.teamScores);
  const currentIndex = teams.indexOf(state.currentTeam);
  const nextTeamIndex = (currentIndex + 1) % teams.length;
  const nextTeam = teams[nextTeamIndex];
  
  // Check if we've completed a full cycle of teams
  const completedCycle = nextTeamIndex === 0;
  const newRound = completedCycle ? state.currentRound + 1 : state.currentRound;
  const isGameOver = newRound > state.totalRounds;
  
  return {
    ...state,
    status: isGameOver ? 'finished' : 'ready',
    teamScores,
    currentTeam: nextTeam,
    currentRound: newRound
  };
};

// Pause the game
export const pauseGame = (state: GameState): GameState => {
  if (state.status !== 'playing') return state;
  
  return {
    ...state,
    status: 'paused'
  };
};

// Resume the game
export const resumeGame = (state: GameState): GameState => {
  if (state.status !== 'paused') return state;
  
  return {
    ...state,
    status: 'playing'
  };
};

// Update the remaining time
export const updateTime = (state: GameState, deltaTime: number): GameState => {
  if (state.status !== 'playing') return state;
  
  const newTime = Math.max(0, state.remainingTime - deltaTime);
  const isTimeUp = newTime <= 0;
  
  return {
    ...state,
    remainingTime: newTime,
    status: isTimeUp ? 'ready' : state.status
  };
};

// Get the winning teams (can have ties)
export const getWinners = (state: GameState): string[] => {
  if (state.status !== 'finished') return [];
  
  const scores = state.teamScores;
  const maxScore = Math.max(...Object.values(scores));
  
  return Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([team]) => team);
};
