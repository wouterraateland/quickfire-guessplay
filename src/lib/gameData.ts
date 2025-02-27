
export interface WordItem {
  word: string;
  category: string;
}

export interface CategoryData {
  name: string;
  description: string;
  color: string;
}

export const categories: CategoryData[] = [
  {
    name: "General",
    description: "A mix of various topics",
    color: "bg-game-purple"
  },
  {
    name: "Movies & TV",
    description: "Famous films and television shows",
    color: "bg-game-red"
  },
  {
    name: "Sports",
    description: "Athletes, teams, and sporting events",
    color: "bg-game-blue"
  },
  {
    name: "Geography",
    description: "Places, landmarks, and countries",
    color: "bg-game-green"
  },
  {
    name: "Famous People",
    description: "Celebrities, historical figures, and personalities",
    color: "bg-game-yellow"
  }
];

// Word list for the game, sorted by category
export const wordList: WordItem[] = [
  // General Category
  { word: "Internet", category: "General" },
  { word: "Coffee", category: "General" },
  { word: "Smartphone", category: "General" },
  { word: "Birthday", category: "General" },
  { word: "Camera", category: "General" },
  { word: "Chocolate", category: "General" },
  { word: "Glasses", category: "General" },
  { word: "Library", category: "General" },
  { word: "Umbrella", category: "General" },
  { word: "Piano", category: "General" },
  { word: "Butterfly", category: "General" },
  { word: "Fireworks", category: "General" },
  { word: "Restaurant", category: "General" },
  { word: "Rainbow", category: "General" },
  { word: "Clock", category: "General" },
  
  // Movies & TV
  { word: "Star Wars", category: "Movies & TV" },
  { word: "Harry Potter", category: "Movies & TV" },
  { word: "The Simpsons", category: "Movies & TV" },
  { word: "Titanic", category: "Movies & TV" },
  { word: "Stranger Things", category: "Movies & TV" },
  { word: "Game of Thrones", category: "Movies & TV" },
  { word: "The Matrix", category: "Movies & TV" },
  { word: "Breaking Bad", category: "Movies & TV" },
  { word: "Avengers", category: "Movies & TV" },
  { word: "Jurassic Park", category: "Movies & TV" },
  { word: "Friends", category: "Movies & TV" },
  { word: "The Lion King", category: "Movies & TV" },
  { word: "The Office", category: "Movies & TV" },
  { word: "Inception", category: "Movies & TV" },
  { word: "Avatar", category: "Movies & TV" },
  
  // Sports
  { word: "Basketball", category: "Sports" },
  { word: "Soccer", category: "Sports" },
  { word: "Tennis", category: "Sports" },
  { word: "Olympic Games", category: "Sports" },
  { word: "Michael Jordan", category: "Sports" },
  { word: "World Cup", category: "Sports" },
  { word: "Baseball", category: "Sports" },
  { word: "Swimming", category: "Sports" },
  { word: "Golf", category: "Sports" },
  { word: "Serena Williams", category: "Sports" },
  { word: "Usain Bolt", category: "Sports" },
  { word: "Formula 1", category: "Sports" },
  { word: "LeBron James", category: "Sports" },
  { word: "Super Bowl", category: "Sports" },
  { word: "Wimbledon", category: "Sports" },
  
  // Geography
  { word: "New York", category: "Geography" },
  { word: "Eiffel Tower", category: "Geography" },
  { word: "Great Wall of China", category: "Geography" },
  { word: "Amazon Rainforest", category: "Geography" },
  { word: "Mount Everest", category: "Geography" },
  { word: "Grand Canyon", category: "Geography" },
  { word: "Venice", category: "Geography" },
  { word: "Tokyo", category: "Geography" },
  { word: "Sahara Desert", category: "Geography" },
  { word: "Niagara Falls", category: "Geography" },
  { word: "Sydney Opera House", category: "Geography" },
  { word: "Amazon River", category: "Geography" },
  { word: "Northern Lights", category: "Geography" },
  { word: "Great Barrier Reef", category: "Geography" },
  { word: "Taj Mahal", category: "Geography" },
  
  // Famous People
  { word: "Albert Einstein", category: "Famous People" },
  { word: "Leonardo da Vinci", category: "Famous People" },
  { word: "Beyoncé", category: "Famous People" },
  { word: "Barack Obama", category: "Famous People" },
  { word: "Steve Jobs", category: "Famous People" },
  { word: "Taylor Swift", category: "Famous People" },
  { word: "Nelson Mandela", category: "Famous People" },
  { word: "Oprah Winfrey", category: "Famous People" },
  { word: "William Shakespeare", category: "Famous People" },
  { word: "Marie Curie", category: "Famous People" },
  { word: "Elvis Presley", category: "Famous People" },
  { word: "Madonna", category: "Famous People" },
  { word: "Muhammad Ali", category: "Famous People" },
  { word: "Elon Musk", category: "Famous People" },
  { word: "Marilyn Monroe", category: "Famous People" }
];

// Get random words from the word list
export const getRandomWords = (count: number, category?: string): WordItem[] => {
  // Filter by category if specified
  const filteredList = category && category !== "All" 
    ? wordList.filter(item => item.category === category)
    : wordList;
    
  // Create a copy to avoid modifying the original array
  const shuffled = [...filteredList];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the first 'count' items
  return shuffled.slice(0, count);
};

// Team data
export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

export const teams: Team[] = [
  { id: "team1", name: "Team Red", color: "team-red", score: 0 },
  { id: "team2", name: "Team Blue", color: "team-blue", score: 0 },
  { id: "team3", name: "Team Green", color: "team-green", score: 0 },
  { id: "team4", name: "Team Yellow", color: "team-yellow", score: 0 },
  { id: "team5", name: "Team Purple", color: "team-purple", score: 0 }
];
