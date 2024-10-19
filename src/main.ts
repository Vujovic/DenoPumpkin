import { GameState, initialState } from "./game/state.ts";
import { render } from "./game/render.ts";
import { movePlayer, movePumpkins, checkCollisions } from "./game/actions.ts";
import { setupTerminal, restoreTerminal, readKeys } from "./utils/terminal.ts";

async function gameLoop() {
  let state: GameState = initialState();
  setupTerminal();

  render(state);

  try {
    for await (const key of readKeys()) {
      if (key === "q") break;

      if (key === "s" && !state.started) {
        state.started = true;
        state.pumpkins = checkCollisions(state).pumpkins;
      } else if (state.started) {
        switch (key) {
          case "\x1B[A": state = movePlayer(state, 'up'); break;
          case "\x1B[B": state = movePlayer(state, 'down'); break;
          case "\x1B[D": state = movePlayer(state, 'left'); break;
          case "\x1B[C": state = movePlayer(state, 'right'); break;
        }
        state = movePumpkins(state);
        state = checkCollisions(state);
      }

      render(state);
    }
  // deno-lint-ignore no-explicit-any
  } catch (e: any) {
    console.clear();
    console.log(e.message);
    await new Promise(resolve => setTimeout(resolve, 2000));
  } finally {
    restoreTerminal();
  }
}

if (import.meta.main) {
  gameLoop();
}