import React, { Component} from 'react';
import PlayField from '../components/play-field/play-field';
import Leaders from '../components/leaders/leaders';
import Form from '../components/form/form';

const gameMode_path = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings'

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
      this.startGame();
    }

    startGame() {
      const message = document.querySelector('.message');
      const { delay, name } = this.state;
      const allElemTotal = document.querySelectorAll('.field-cell-select');

      const serverCall = this.sendData.bind(this);

      let gameFlow = setInterval(() => {
        const allElem = document.querySelectorAll('.field-cell-select');
        const length = allElem.length;

        const random = Math.floor(Math.random() * length);
        let randomElem = allElem[random];

        randomElem.classList.add('blue');

        randomElem.classList.remove('field-cell-select');

        randomElem.addEventListener('click', function(e) {
          e.target.classList.add('green');
          randomElem.classList.add('player-win');
          e.target.classList.remove('blue');
        });

        setTimeout(() => {
          if(randomElem.classList.contains('green')) {
            return
          } else {
            randomElem.classList.add('red');
            randomElem.classList.add('machine-win');
            randomElem.classList.remove('blue');

            if (!message.classList.contains('hidden')) {
              randomElem.classList.remove('red');
            }
          }
        }, delay);

        const machinePoints = document.querySelectorAll('.machine-win');
        const playerPoints = document.querySelectorAll('.player-win');

        if (machinePoints.length * 2 > allElemTotal.length) {
          message.innerHTML = 'Machine won';
          message.classList.remove('hidden');
          message.classList.add('computer-won');
          randomElem.classList.remove('blue');
          clearInterval(gameFlow);
          serverCall();
        }

        if (playerPoints.length * 2 > allElemTotal.length) {
          message.innerHTML = `${name} won`;
          message.classList.remove('hidden');
          message.classList.add('player-won');
          randomElem.classList.remove('blue', 'green');
          clearInterval(gameFlow);
          serverCall();
        }
      }, delay)

      
    }

    sendData() {
      const { name } = this.state;
      const message = document.querySelector('.message');
      const serverURL = 'https://starnavi-frontend-test-task.herokuapp.com/winners';

      const fullDate = new Date();
      const date = fullDate.toLocaleString('en',
                                                {
                                                  day: 'numeric',
                                                  month: 'long',
                                                  year: 'numeric'
                                                });

      const time = fullDate.toLocaleString().split(',')[1].slice(0, -3);

      let nameServer;

      if (message.classList.contains('computer-won')) {
        nameServer = 'Computer';
      }

      if (message.classList.contains('player-won')) {
        nameServer = name;
      }

      fetch(serverURL, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: Math.random(), winner: nameServer, date: `${time}; ${date}`})});

        // leaders.pop().unshift({id: Math.random(), winner: nameServer, date: `${time}; ${date}`});
        // this.setState({ leaders });
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