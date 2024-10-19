import { GameState, Pumpkin } from "./state.ts";

export function movePlayer(
  state: GameState,
  direction: "up" | "down" | "left" | "right",
): GameState {
  const newState = { ...state };
  switch (direction) {
    case "up":
      newState.playerY = Math.max(newState.playerY - 1, 1);
      break;
    case "down":
      newState.playerY = Math.min(newState.playerY + 1, newState.maxY);
      break;
    case "left":
      newState.playerX = Math.max(newState.playerX - 1, 0);
      break;
    case "right":
      newState.playerX = Math.min(newState.playerX + 1, newState.maxX);
      break;
  }
  return newState;
}

export function movePumpkins(state: GameState): GameState {
  const newState = { ...state };
  newState.pumpkins = newState.pumpkins.map((pumpkin) => {
    if (Math.random() < 0.5) return pumpkin;

    const newPumpkin = { ...pumpkin };
    if (Math.random() < 0.5) {
      newPumpkin.x += Math.random() < 0.5 ? 1 : -1;
    } else {
      newPumpkin.y += Math.random() < 0.5 ? 1 : -1;
    }

    newPumpkin.x = Math.max(0, Math.min(newPumpkin.x, state.maxX));
    newPumpkin.y = Math.max(1, Math.min(newPumpkin.y, state.maxY));

    return newPumpkin;
  });
  return newState;
}

export function checkCollisions(state: GameState): GameState {
  const newState = { ...state };
  newState.pumpkins = newState.pumpkins.filter((pumpkin) =>
    !(pumpkin.isGood && pumpkin.x === state.playerX &&
      pumpkin.y === state.playerY)
  );

  if (
    newState.pumpkins.some((pumpkin) =>
      !pumpkin.isGood && pumpkin.x === state.playerX &&
      pumpkin.y === state.playerY
    )
  ) {
    throw new Error("Game Over");
  }

  if (newState.pumpkins.filter((p) => p.isGood).length === 0) {
    newState.level++;
    if (newState.level > 5) {
      throw new Error("You Win!");
    }
    newState.pumpkins = generatePumpkins(newState);
  }

  return newState;
}

function generatePumpkins(state: GameState): Pumpkin[] {
  const pumpkins: Pumpkin[] = [];
  const goodCount = 10;
  const badCount = state.level * 3;

  for (let i = 0; i < goodCount + badCount; i++) {
    let x: number, y: number;
    do {
      x = Math.floor(Math.random() * (state.maxX - 4)) + 2;
      y = Math.floor(Math.random() * (state.maxY - 3)) + 2;
    } while (pumpkins.some((p) => p.x === x && p.y === y));

    pumpkins.push({ x, y, isGood: i < goodCount });
  }

  return pumpkins;
}
