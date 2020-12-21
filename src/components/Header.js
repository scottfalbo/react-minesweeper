import React from 'react';
import './styles/header.css';
import {Consumer} from './Context';

const Header = () => (
  <header>
    <h1>MineSweeper</h1>
    <Consumer>
      {({menuButtons}) => (
        <nav>
          <ul>
            <li>
              <button onClick={menuButtons.optionsToggle}>options</button>
            </li>
            <li>
              <button onClick={menuButtons.controlsToggle}>controls</button>
            </li>
          </ul>
        </nav>
      )}
    </Consumer>
  </header>
);

export default Header;