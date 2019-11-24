import React from 'react';
import './App.css';
import t from './bingoTiles.json';
const tiles = t.tiles;

export default class AppComponent extends React.Component {
  numDone = 0
  crossOut = (e) => {
    if (e.target.style['textDecoration'] === 'line-through') {
      this.numDone--;
      e.target.style['textDecoration'] = 'none'
      return;
    }
    e.target.style['textDecoration'] = 'line-through';
    this.numDone++;
    
    if (this.numDone === 25) {
      console.log("bingo");
    }
  }

  rngGenerator(minimum, maximum) {
    var values = [];
	  return function random() {
		  const number = Math.floor(
			  (Math.random() * (maximum - minimum)) + minimum
      );
      if (values.includes(number)) {
        return random();
      }
      values.push(number);
      return number;
	  };
  }

  render() {
    var rng = this.rngGenerator(0, tiles.length);
    var rows = [[],[],[],[],[]];
    for (var i = 0; i < 5; i++) {
      for (var b = 0; b < 5; b++) {
        rows[i][b] = <td key={i + "," + b} onClick={this.crossOut}>{tiles[rng()]}</td>
      }
    }
    return (
      <div className="App">
        <h1 className="header">DarkViperAU Bingo</h1>
        <table>
          <tbody>
          <tr>
            {rows[0]}
          </tr>
          <tr>
            {rows[1]}
          </tr>
          <tr>
            {rows[2]}
          </tr>
          <tr>
            {rows[3]}
          </tr>
          <tr>
            {rows[4]}
          </tr>
          <tr>
            {rows[5]}
          </tr>
          </tbody>
        </table>
        <h1 className="header">twitch.tv/DarkViperAU</h1>
      </div>
    );
  }
}
