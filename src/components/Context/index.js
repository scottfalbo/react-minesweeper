import React, { Component } from 'react';

const Minesweeper = React.createContext();

export class Provider extends Component {

  //Load saved board size options from local storage if, else beginner
  getSpecs = () => {
    if (localStorage.getItem('specs')) {
      let specs = (localStorage.getItem('specs')).split(',');
      return specs.map(val => parseInt(val));
    } else {
      return [9, 9, 10];
    }
  }
  specs = this.getSpecs();

  state = {
    boardY: this.specs[0],
    boardX: this.specs[1],
    mines: this.specs[2],
    minesStatic: this.specs[2],
    firstTurn: true,
    controlsSwitch: false,
    optionsSwitch: false
  };

  // Timer controls, start/stop/reset
  timerStart = () => {
    if (this.state.firstTurn) {
      this.setState({ firstTurn: false });
    }
  }
  timerStop = () => {
    this.setState({ firstTurn: true });
  }

  // Menu buttons for toggling display on and off
  optionsToggle = (event) => {
    event.preventDefault();
    if (this.state.controlsSwitch) { this.controlsSwitch = false; }
    this.setState({
      optionsSwitch: !this.state.optionsSwitch,
      controlsSwitch: this.controlsSwitch
    });
  }
  controlsToggle = (event) => {
    event.preventDefault();
    if (this.state.optionsSwitch) { this.optionsSwitch = false; }
    this.setState({
      controlsSwitch: !this.state.controlsSwitch,
      optionsSwitch: this.optionsSwitch
    });
  }

  // Create the game board
  // Build an array of mine locations based on game difficulty
  createMines = (quantity, limit) => {
    const mineArray = [];
    for (let i = 0; i < quantity; i++) {
      let getNum = this.randomNumber(limit);
      while (mineArray.includes(getNum)) {
        getNum = this.randomNumber(limit);
      }
      mineArray.push(getNum);
    }
    return mineArray;
  }
  randomNumber = (limit) => Math.floor((Math.random() * limit) + 1);

  // Build the board and create each cell object
  mineArray = this.createMines(this.state.mines, this.state.boardX * this.state.boardY);
  counter = 0;
  gameCell = {};
  boardArray = Array.apply(null, Array(this.state.boardY))
    .map((y, yi) => Array.apply(null, Array(this.state.boardX))
      .map((x, xi) => {
        this.counter++;
        let goBoom = false;
        this.mineArray.forEach(key => {
          if (key === this.counter) {
            goBoom = true;
          }
        });
        return this.gameCell = {
          key: this.counter.toString(),
          clicked: false,
          cellY: yi,
          cellX: xi,
          goBoom: goBoom,
          danger: 0,
          view: '.',
          highlight: false
        }
      }));

  // Function to make sure a cells cords are within the array matrix
  isOnBoard = (y, x) => {
    if (y >= 0 && y < this.state.boardY && x >= 0 && x < this.state.boardX) {
      return true;
    } else {
      return false;
    }
  }

  // Takes in a cell's cords and returns an array of surrounding cells
  checkAround = (y, x) => {
    const returnArray = [];
    for (let a = -1; a < 2; a++) {
      for (let b = -1; b < 2; b++) {
        if (!(a === 0 && b === 0) && this.isOnBoard(y + a, x + b)) {
          returnArray.push(this.boardArray[y + a][x + b]);
        }
      }
    }
    return returnArray;
  }
  // Find the sum of surrounding mines for each cell
  boardArray = this.boardArray.map((row) => {
    return row.map(cell => {
      if (!cell.goBoom) {
        cell.danger = (this.checkAround(cell.cellY, cell.cellX)).filter(mines => {
          if (mines.goBoom) { return true; }
          else { return false; }
        }).length;
      } else {
        cell.danger = 'X';
      }
      return cell;
    });
  });

  // call back function for tracking number of active unmarked mines in play
  mineTracker = (change) => {
    this.setState(prev => {
      return { mines: prev.mines += change }
    });
  }

  render() {
    return (
      <Minesweeper.Provider value={{
        state: this.state,
        timerControls: {
          timerStart: this.timerStart,
          timerStop: this.timerStop
        },
        menuButtons: {
          optionsToggle: this.optionsToggle,
          controlsToggle: this.controlsToggle
        },
        board: this.boardArray,
        checkAround: this.checkAround,
        isOnBoard: this.isOnBoard,
        mineTracker: this.mineTracker
      }}>
        {this.props.children}
      </Minesweeper.Provider>
    )
  }
}

export const Consumer = Minesweeper.Consumer;