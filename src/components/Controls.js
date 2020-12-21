import React from 'react';
import './styles/control.css';

const Controls = (props) => (
  <section>
    <h1>Controls</h1>
    <article>
      <p><span>Left Click:</span> an empty square to reveal it.</p>
      <p><span>Right Click:</span> an empty square to flag, or unflag it.</p>
      <p><span>Shift Click:</span> a number to reveal it's adjacent squares. This only works if there are adjacent flags equal to the number.</p>
    </article>
    <button onClick={props.menuButtons.controlsToggle} className="close-window">
      ✖
      </button>
  </section>
);

export default Controls;