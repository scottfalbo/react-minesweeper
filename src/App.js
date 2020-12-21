import React from 'react';
import './App.css';
import Header from './components/Header'
import InfoBoard from './components/InfoBoard'
import GameBoard from './components/GameBoard'
import Options from './components/Options'
import Controls from './components/Controls'
import { Consumer } from './components/Context'

const App = () => (
  <Consumer>
    {({ board, timerControls, mineTracker, checkAround, state, menuButtons }) => (
      <div className="app">
        <section className="game-box">
          <Header />
          <InfoBoard />
          <GameBoard
            board={board}
            timerControls={timerControls}
            mineTracker={mineTracker}
            checkAround={checkAround}
            higherState={state}
          />
          <div className={state.optionsSwitch ? "toggle-box options show-me" : "toggle-box options hide-me"}>
            <Options menuButtons={menuButtons} />
          </div>
          <div className={state.controlsSwitch ? "toggle-box controls show-me" : "toggle-box controls hide-me"}>
            <Controls menuButtons={menuButtons} />
          </div>
        </section>
      </div>
    )}
  </Consumer>
);

export default App;
