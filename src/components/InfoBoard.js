import React from 'react';
import './styles/info-board.css'
import MineTracker from './MineTracker';
import Timer from './Timer';
import {Consumer} from './Context';

const InfoBoard = () => {

  const resetGame = () => {
    window.location.reload();
  }

  return (
    <section className="info-board">
      <MineTracker />
      <div>
        <button onClick={resetGame}>reset</button>
      </div>
      <Consumer>
        {({state}) => (
          <Timer firstTurn={state.firstTurn}/>
        )}
      </Consumer>
    </section>
  )
}

export default InfoBoard;