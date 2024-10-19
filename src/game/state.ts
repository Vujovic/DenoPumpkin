export interface Pumpkin {
  x: number;
  y: number;
  isGood: boolean;
}

export interface GameState {
  playerX: number;
  playerY: number;
  maxX: number;
  maxY: number;
  level: number;
  pumpkins: Pumpkin[];
  started: boolean;
}

export const initialState = (): GameState => {
  const { columns, rows } = Deno.consoleSize();
  return {
    playerX: 1,
    playerY: 2,
    maxX: Math.min(columns - 1, 79),
    maxY: Math.min(rows - 1, 21),
    level: 1,
    pumpkins: [],
    started: false,
  };
};
