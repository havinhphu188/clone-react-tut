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
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
    if ((square[i] !== null)||((calculateWinner(square)) !== null)) return;
    square[i] = (this.state.isxNext ? 'X':'O');
    let newHistory =  this.state.history;
    newHistory.splice(this.state.step+1,newHistory.length-this.state.step);
    newHistory.push({square:square});
    this.setState({
        history:newHistory,
        step: this.state.step + 1,
        isxNext: !this.state.isxNext
    })
  }

  jumpTo(move) {
    this.setState({
      step: move,
      isxNext: (move % 2) === 0
    });
  }


  render() {
    const current = this.state.history[this.state.step];  
    let status ;
    const winner = calculateWinner(current.square);
    if (winner == null){
      status = "Next player: " + (this.state.isxNext?'X':'O');
    }else{
      status = "Winner is: " + winner;
    }

    let history = this.state.history;
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board currentBoard={current} onClick={i=> this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
function calculateWinner(squares){
  let winCases = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
  for (let winCase of winCases){
    if ((squares[winCase[0]] === squares[winCase[1]])
    &&(squares[winCase[0]] === squares[winCase[2]]
      )&&(squares[winCase[0]]!==null)){
        return squares[winCase[0]]
      }

  }
  return null;  
  
}