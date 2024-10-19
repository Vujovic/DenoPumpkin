# 🎃 A Spooky Deno Terminal Game 🎃

A simple terminal game to try out Deno.

## 🎮 How to Play

1. Use the arrow keys to move your character.
2. Collect good pumpkins to progress through levels.
3. Avoid bad pumpkins or it's game over!
4. Complete all 5 levels to win the game.

## 🕹️ Controls

- Arrow keys: Move your character
- 'S': Start the game
- 'Q': Quit the game

## 🚀 Getting Started

### Prerequisites

Make sure you have Deno installed on your system. If not, you can install it by following the instructions on the [official Deno website](https://deno.land/#installation).

### Running the Game

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/pumpkinode.git
   cd pumpkinode
   ```

2. Run the game:
   ```
   deno task start
   ```

That's it! You should now see the game running in your terminal.

### 🏗️ Compiling the Game

One of the cool features of Deno is the ability to compile your TypeScript code into a single executable file. This allows you to run the game on any machine without needing Deno installed. Here's how to do it:

1. Make sure you're in the project directory.

2. Run the following command:
   ```
   deno task compile
   ```

3. This will create an executable file named `Pumpkin` (or `Pumpkin.exe` on Windows) in the dist directory.

4. You can now run this executable directly:
   ```
   dist/Pumpkin
   ```

   On Windows:
   ```
   dist/Pumpkin.exe
   ```

Now you have a standalone executable that you can distribute and run on any compatible system without needing Deno installed!

## 📜 License

This project is open source and available under the MIT License.
