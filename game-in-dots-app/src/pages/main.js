import React, { Component} from 'react';
import PlayField from '../components/play-field/play-field';
import Leaders from '../components/leaders/leaders';
import Form from '../components/form/form';

const gameMode_path = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings'

class Game extends Component {
    state = {
        field: null,
        delay: null,
        name: ''
    }

    startGame = async (e) => {
            e.preventDefault();
        
            const gameMode = e.target.elements.gameMode.value;
            const gamerName = e.target.elements.name.value;
        
            let api_call;
            let data;
            api_call = await fetch(gameMode_path);
            data = await api_call.json();
        
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

            console.log(this.state);
    }

    render() {
        return (
            <section className="game-wrapper">
                <div className="play-wrapper">
                    <Form startGame={this.startGame} />
                    <PlayField />
                </div>
                <Leaders />
            </section>
        )
    }
}

export default Game