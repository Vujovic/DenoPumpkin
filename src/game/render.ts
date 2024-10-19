import { GameState, Pumpkin } from "./state.ts";

const ICONS = {
  PLAYER: "",
  BAD_PUMPKIN: "󰮣",
  GOOD_PUMPKIN: "󰮿",
};

export function render(state: GameState): void {
  console.clear();

  if (!state.started) {
    console.log(`
     _/_
    /^,^\\
    \\\\_//

Welcome to Pumpkinode!

PRESS S TO START
`);
    return;
  }

  const header = `LEVEL: ${state.level} | PUMPKINS LEFT: ${
    state.pumpkins.filter((p) => p.isGood).length
  }`;
  console.log(header);

  const gameHeight = Math.min(state.maxY - 1, 20);
  const gameWidth = Math.min(state.maxX + 1, 80);

  const screen = new Array(gameHeight).fill(0).map(() =>
    new Array(gameWidth).fill(" ")
  );

  const adjustPosition = (pos: number, max: number) =>
    Math.min(Math.max(pos, 0), max - 1);

  const playerY = adjustPosition(state.playerY - 1, gameHeight);
  const playerX = adjustPosition(state.playerX, gameWidth);
  screen[playerY][playerX] = ICONS.PLAYER;

  state.pumpkins.forEach((pumpkin: Pumpkin) => {
    const pumpkinY = adjustPosition(pumpkin.y - 1, gameHeight);
    const pumpkinX = adjustPosition(pumpkin.x, gameWidth);
    screen[pumpkinY][pumpkinX] = pumpkin.isGood
      ? ICONS.GOOD_PUMPKIN
      : ICONS.BAD_PUMPKIN;
  });

  console.log(screen.map((row) => row.join("")).join("\n"));
}
