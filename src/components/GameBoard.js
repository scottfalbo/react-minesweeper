import React, { Component } from 'react';
import './styles/game-board.css';
import BoardRow from './BoardRow';

class GameBoard extends Component {

  state = {
    board: this.props.board
  }

  disableContextMenu = (event) => {
    event.preventDefault();
  }

  // Mouse event callbacks for the handlers in BoardCell
  leftClick = (cell) => {
    this.props.timerControls.timerStart();
    let boom = false;
    let safe = false;
    cell.view = cell.danger
    cell.clicked = true;
    if (cell.danger === 'X') { boom = true; }
    if (cell.danger === 0) { safe = true; }
    let board = this.props.board;
    board[cell.cellY][cell.cellX] = cell;
    this.setState(() => board);
    if (boom) { this.kaboom(cell); }
    if (safe) { this.exposeBlanks(cell, board); }
    if (!boom) { this.winner = this.checkWin(); }
  }

  rightClick = (cell) => {
    cell.view = cell.view === '.' ? 'F' : '.';
    if (cell.view === 'F') {
      this.props.mineTracker(-1);
      cell.clicked = true;
    }
    else if (cell.view === '.') {
      this.props.mineTracker(1);
      cell.clicked = false;
    }
    let board = this.props.board;
    board[cell.cellY][cell.cellX] = cell;
    this.setState(() => board);
  }

  shiftClick = (cell) => {
    this.leaveHighlight(cell);
    // get adjacent cells and count total flags
    let totalFlags = 0;
    let adjacent = (this.props.checkAround(cell.cellY, cell.cellX));
    adjacent.forEach(flag => {
      if (flag.view === 'F') { totalFlags++; }
    });
    // expose and handle adjacent cells
    let board = this.props.board;
    if (totalFlags >= cell.view) {
      adjacent.forEach(adj => {
        if (adj.view !== 'F') {
          board[adj.cellY][adj.cellX].view = adj.danger;
          board[adj.cellY][adj.cellX].clicked = true;
          if (adj.view === 0) { this.exposeBlanks(adj, board); }
        }
        if (adj.view === 'X') { this.kaboom(adj); }
      });
    }
    this.setState(() => board);
    this.winner = this.checkWin();
  }

  shiftHighlight = (cell) => {
    let board = this.state.board;
    let adjacent = (this.props.checkAround(cell.cellY, cell.cellX));
    adjacent.forEach(adj => {
      board[adj.cellY][adj.cellX].highlight = true;
    });
    this.setState(() => board);
  }

  leaveHighlight = (cell) => {
    let board = this.state.board;
    let adjacent = (this.props.checkAround(cell.cellY, cell.cellX));
    adjacent.forEach(adj => {
      board[adj.cellY][adj.cellX].highlight = false;
    });
    this.setState(() => board);
  }

  // Functions to check if a win or loss has occurred
  lose = false;
  kaboom = (cell) => {
    this.lose = true;
    let board = this.state.board.map(y => (
      y.map(x => {
        x.clicked = true;
        cell.view = 'L';
        if (x.view !== "F") { x.view = x.danger; }
        return x;
      })
    ));
    this.props.timerControls.timerStop();
    this.setState(() => board);
  }

  winner = false;
  checkWin = () => {
    let counter = 0;
    this.state.board.forEach(y => {
      y.forEach(x => {
        if (x.view >= 0 && x.view <= 8) { counter++; }
      })
    });
    const specs = this.props.higherState;
    if ((specs.boardY * specs.boardX) - specs.minesStatic === counter) {
      this.props.timerControls.timerStop();
      return true;
    }
    else { return false; }
  }

  // Recursively expose cells adjacent to 0s
  exposeBlanks = (cell, board) => {
    let adjacent = this.props.checkAround(cell.cellY, cell.cellX);
    let checkAgain = [];
    adjacent.forEach(adj => {
      board[adj.cellY][adj.cellX].view = adj.danger;
      if (adj.danger === 0 && !adj.clicked){checkAgain.push(adj);}
      board[adj.cellY][adj.cellX].clicked = true;
    });
    this.setState(() => board);
    if (checkAgain.length === 0){}
    else {
      checkAgain.forEach(recur => {
        this.exposeBlanks(recur, board);
      })
    }
  }

  render() {

    let reader = '';
    if (this.winner) { reader = `You made it!!!`; }
    else if (this.lose) { reader = 'You Exploded!'; }
    else { reader = '...' }

    return (
      <section className="game-board">
        <table className="mine-field"
          onContextMenu={this.disableContextMenu}>
          <tbody>
            {this.state.board.map((x, i) =>
              <BoardRow
                row={this.state.board[i]}
                key={`row${i}`}
                clicks={{
                  leftClick: this.leftClick,
                  rightClick: this.rightClick,
                  shiftClick: this.shiftClick,
                  shiftHighlight: this.shiftHighlight,
                  leaveHighlight: this.leaveHighlight
                }}
              />
            )}
          </tbody>
        </table>
        <div className="reader-board">
          <p>{reader}</p>
        </div>
      </section>
    );
  }
}

export default GameBoard;