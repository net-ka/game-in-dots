import React, { Component } from 'react';
import PlayField from './play-field/play-field';
import Leaders from './leaders/leaders';
import Form from './form/form';

const gameMode_path = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings'
let gameFlow;

class Game extends Component {
  state = {
    field: null,
    delay: null,
    name: '',
    leaders: null
  }

  componentDidMount() {
    const serverURL = 'https://starnavi-frontend-test-task.herokuapp.com/winners';

    fetch(serverURL)
      .then(response => response.json())
      .then(leaders => leaders.reverse().slice(0, 5))
      .then(leaders => this.updateData(leaders))
      .catch(error => error);
  }

  updateData(leaders) {
    this.setState({ leaders });
  }

  drawField = async (e) => {
    e.preventDefault();
    clearInterval(gameFlow);

    const fieldTable = document.querySelector('.field-table');
    if (fieldTable) {
      this.setState({
        field: null
      });
    }

    const message = document.querySelector('.message');
    message.classList.add('hidden');

    const gameMode = e.target.elements.gameMode.value;
    const gamerName = e.target.elements.name.value;

    const api_call = await fetch(gameMode_path);
    const data = await api_call.json();

    if (gameMode === 'Easy') {
      this.setState({
        field: data.easyMode.field,
        delay: data.easyMode.delay,
        name: gamerName
      });
    }

    if (gameMode === 'Normal') {
      this.setState({
        field: data.normalMode.field,
        delay: data.normalMode.delay,
        name: gamerName
      });
    }

    if (gameMode === 'Hard') {
      this.setState({
        field: data.hardMode.field,
        delay: data.hardMode.delay,
        name: gamerName
      });
    }

    const { field, name } = this.state;

    if (field && name) {
      this.startGame();
    }
  }

  startGame() {
    const message = document.querySelector('.message');
    const { delay, name } = this.state;
    const allElemTotal = document.querySelectorAll('.field-cell');

    const serverCall = this.sendData.bind(this);

    gameFlow = setInterval(() => {
      const allElem = document.querySelectorAll('.field-cell-select');
      const length = allElem.length;

      const random = Math.floor(Math.random() * length);
      let randomElem = allElem[random];

      if (randomElem) {
      randomElem.classList.add('blue');
      randomElem.classList.remove('field-cell-select');

      randomElem.addEventListener('click', function (e) {
        if (e.target.classList.contains('blue')) {
          e.target.classList.add('player-win');
          e.target.classList.remove('blue');
        }
      });
      }

      const playerPoints = document.querySelectorAll('.player-win');
      const machinePoints = document.querySelectorAll('.machine-win');

      if (!randomElem && (playerPoints.length > machinePoints.length)) {
        message.innerHTML = `${name} won`;
        message.classList.remove('hidden');
        clearInterval(gameFlow);
        serverCall(name);
      }

      if (!randomElem && (playerPoints.length < machinePoints.length)) {
        message.innerHTML = 'Computer won';
        message.classList.remove('hidden');
        clearInterval(gameFlow);
        serverCall('Computer');
      }

      setTimeout(() => {
        if (randomElem && randomElem.classList.contains('blue')) {
          randomElem.classList.add('machine-win');
          randomElem.classList.remove('blue');
        }
      }, delay);

      if (randomElem && ((playerPoints.length * 2) > allElemTotal.length)) {
        message.innerHTML = `${name} won`;
        message.classList.remove('hidden');
        randomElem.classList.remove('blue', 'player-win', 'machine-win');
        clearInterval(gameFlow);
        serverCall(name);
      }

      if (randomElem && (((machinePoints.length + 1) * 2) > allElemTotal.length)) {
        message.innerHTML = 'Computer won';
        message.classList.remove('hidden');
        clearInterval(gameFlow);
        randomElem.classList.remove('blue', 'machine-win');
        serverCall('Computer');
      }
    }, delay)
  }

  sendData(nameServer) {
    const serverURL = 'https://starnavi-frontend-test-task.herokuapp.com/winners';

    const fullDate = new Date();
    const date = fullDate.toLocaleString('en', { day: 'numeric', month: 'long', year: 'numeric' });

    const time = fullDate.toLocaleString().split(',')[1].slice(0, -3);

    fetch(serverURL, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: Math.random(), winner: nameServer, date: `${time}; ${date}` })
    })
      .then(response => response.json())
      .then(leaders => leaders.reverse().slice(0, 5))
      .then(leaders => this.updateData(leaders))
      .catch(error => error);;

    const playButton = document.querySelector('.play-button');
    playButton.innerHTML = 'PLAY AGAIN';

    this.setState({
      delay: null,
      name: ''
    });

  }

  render() {
    return (
      <section className="game-wrapper">
        <div className="play-wrapper">
          <Form drawField={this.drawField} />
          <PlayField {...this.state} />
        </div>
        {this.state.leaders && <Leaders {...this.state} />}
      </section>
    )
  }
}

export default Game