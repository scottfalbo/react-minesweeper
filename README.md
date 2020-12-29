# React Minesweeper

## About the Project
This is my first React app.  I decided to recreate the Windows classic Minesweeper to practice building components, passing props and altering states.
*note: This app is designed for desktop and has no mobile functionality.*

## Technologies
<img src = "https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white"> <img src = "https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white"> <img src = "https://img.shields.io/badge/-JavaScript-eed718?style=flat&logo=javascript&logoColor=ffffff"> <img src="https://img.shields.io/badge/-React-000000?style=flat&logo=react&logoColor=00c8ff">

## Getting Started
+ Downloading:
  1. Clone the repo
  2. `cd` into the repo
  3. `npm install` for dependencies
  4. `npm start`
    + available at `http://localhost:3000`

+ Game Controls
  + **Left Click** to expose a square.
  + **Right Click** to flag or unflag a square.
  + **Shift Click** a number to reveal adjacent numbers.  This only works if there are adjacent flags equal to the number clicked.

## Change Log

+ 12/07/20 -
  + Basic app set up and file structure.
  + Built a game field with a nested array and numbered each cell for easy reference.
  + Populated the game field matrix with mines and numbers on the surrounding cells.
  + Currently printing exposed cells to DOM with X for mines and numbers.
  + Reset button refreshes the window, mine count displays on DOM.
+ 12/09/20 -
  + Added left and right click functionality.
    + Left click exposes a number or bomb.
    + Right click plants and removes flags.
      + Total number of mines track as user adds or removes flags.
+ 12/10/20 - 
  + When a safe cell is selected all connected safe cells are exposed.
  + Added color to the numbers and some images for flags and bombs.
  + Win and lose functions created.
+ 12/11/20 - 
  + Got the timer starting with first move and stopping with a win or loss.
  + When shift click is used the cell and surrounding cells are highlighted.
  + When a cell is shift clicked, if the number of the cell >= the number of surrounding flags it will expose the surrounding cells.
  + Both win and lose functions work if shift click ends the game.
+ 12/15/20 - 
  + Did the rest of the styling.
  + Added a board size option that persists in local memory.
  + Added a control/how to play page.
+ 12/17/20 - 
  + The game is functioning as intended.
+ ## Starting a complete refactor
+ 12/18/20 - 
  + Learned about Context API and restructured the entire file tree and flow.
  + Started rebuilding the components
+ 12/19/20 -
  + Got most of the components re-built and functioning.
  + Refactored some clunky logic along the way.
+ 12/20/20 - 
  + Refactors are finished.


## Contact
+ Email: Scottfalboart@gmail.com
+ [GitHub](https://github.com/scottfalbo)
+ [LinkedIn](https://www.linkedin.com/in/scott-falbo/)

## Acknowledgements
+ [Code Fellows](https://www.codefellows.org/)
+ [TreeHouse](https://teamtreehouse.com/home)
+ [Stack Overflow](https://stackoverflow.com/)

