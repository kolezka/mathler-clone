export type GameGuesses = string[][];

export enum GuessResultType {
  CORRECT = "CORRECT",
  DIFFERENT_PLACE = "DIFFERENT_PLACE",
  NOT_IN_SOLUTION = "NOT_IN_SOLUTION",
}

export enum LocalStorageKeys {
  GUESSES = "guesses",
}

export interface GameStats {
  winDistribution: number[];
  gamesFailed: number;
  totalGames: number;
}

export interface GameState {
  guesses: GameGuesses;
  solution: string;
}
