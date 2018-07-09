import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return <button className="square" onClick={this.props.onClick}>{this.props.value}</button>;
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.currentBoard.square[i]} onClick={ () => this.props.onClick(i)} />;
  }

  render() {
    const status = "Next player: X";
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          square: [null, null, null, null, null, null, null, null, null]
        }
      ],
      step: 0,
      isxNext: true
    };
  }

  handleClick(i){
    let square = this.state.history[this.state.step].square.slice();
    square[i] = (this.state.isxNext ? 'X':'O');
    let newHistory =  this.state.history;
    newHistory.push({square:square});
    this.setState({
        history:newHistory,
        step: this.state.step + 1,
        isxNext: !this.state.isxNext
    })
  }

  render() {
    const current = this.state.history[this.state.step];  
    return (
      <div className="game">
        <div className="game-board">
          <Board currentBoard={current} onClick={i=> this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
