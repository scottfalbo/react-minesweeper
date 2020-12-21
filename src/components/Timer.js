import React, {Component} from 'react';

class Timer extends Component {

  state = {
    counting: false,
    elapsed: 0,
    lastTime: 0
  }

  componentDidMount(){
    this.intervalId = setInterval(() => this.ticker(), 100);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  ticker = () => {
    if (this.state.counting){
      this.setState(prev => ({
        elapsed: prev.elapsed + .1
      }));
    }
    if(!this.props.firstTurn){
      this.turnTimerOn();
    } else {
      this.turnTimerOff();
    }
  }

  turnTimerOn = () => {
    this.setState(() => ({
      counting: true
    }));
  }
  turnTimerOff = () => {
    this.setState(() => ({
      counting: false,
    }));
  }

  render() {
    const time = Math.floor(this.state.elapsed);
    return(
      <div className="timer display">
        <p>{time}</p>
      </div>
    )
  } 
}
export default Timer;