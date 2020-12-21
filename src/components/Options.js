import React, {Component} from 'react';
import './styles/options.css';

class Options extends Component {

  difficulty = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 'beginner';

  state = {
    difficulty: this.difficulty
  }

  handleSubmit = () => {
    let specs = [];
    if (this.state.difficulty === 'beginner'){specs = [9,9,10];}
    else if (this.state.difficulty === 'intermediate'){specs = [16,16,40];}
    else if (this.state.difficulty === 'expert'){specs = [16,30,99];}
    else {specs = [9,9,10];}
    localStorage.setItem('specs', specs);
  }

  handleChange = (event) => {
    this.setState({
      difficulty: event.target.value
    });
  }

  render(){
    return(
      <section>
        <form onSubmit={this.handleSubmit}>
          <div className="radio">
            <label>
              <input 
                type="radio"
                value="beginner"
                checked={this.state.difficulty === "beginner"}
                onChange={this.handleChange}
              />
              Beginner
            </label>
          </div>
          <div className="radio">
            <label>
              <input 
                type="radio"
                value="intermediate"
                checked={this.state.difficulty === "intermediate"}
                onChange={this.handleChange}
              />
              Intermediate
            </label>
          </div>
          <div className="radio">
            <label>
              <input 
                type="radio"
                value="expert"
                checked={this.state.difficulty === "expert"}
                onChange={this.handleChange}
              />
              Expert
            </label>
          </div>
          <button type="submit">
            start new game
          </button>
        </form>
        <button onClick={this.props.menuButtons.optionsToggle} className="close-window">
          ✖
        </button>
      </section>
    )
  }
}

export default Options;