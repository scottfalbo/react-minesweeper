import React from 'react';
import {Consumer} from './Context';

const MineTracker = () => (
  <Consumer>
    {({state}) => (
      <div className="mine-tracker display">
        <p>{state.mines}</p>
      </div>
    )}
  </Consumer>
);

export default MineTracker;