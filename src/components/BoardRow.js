import React from 'react';
import BoardCell from './BoardCell';
import { Consumer } from './Context';

const BoardRow = (props) => (
  <Consumer>
    {({ timerControls, state }) => (
      <tr>
        {props.row.map(cell => (
          <BoardCell
            cell={cell}
            clicks={props.clicks}
            timerControls={timerControls}
            key={cell.key}
          />
        ))}
      </tr>
    )}
  </Consumer>
);

export default BoardRow;