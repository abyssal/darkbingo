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
      // bingo moment
      console.log("bingo");
      document.getElementById('ayaya').style.display = 'block'
      document.getElementsByClassName('App')[0].style.display = 'none'
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
    var rows = [[], [], [], [], []];
    for (var i = 0; i < 5; i++) {
      for (var b = 0; b < 5; b++) {
        rows[i][b] = <td key={i + "," + b} onClick={this.crossOut}>{tiles[rng()]}</td>
      }
    }
    return (
      <div>
        <img src="ayaya.png" alt="" id='ayaya' style={{ display: 'none', width: '1000px', height:'1000px' }} />
        <div className="App">
          <h1 className="header"><img alt="" src="wave.png" /> DarkViperAU Bingo <img alt="" src="pass.png" /></h1>
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
          <h1 className="header"><img alt="" src="lick.png" id="left" /> <a rel="noopener noreferrer" className="nostyle" target="_blank" href="http://twitch.tv/DarkViperAU">twitch.tv/DarkViperAU</a> <img alt="" src="lick.png" /></h1>
          <p id='credits'>Made by <a href="http://twitter.com/abyssalnz">Abyssal</a></p>
        </div>
      </div>
    );
  }
}
