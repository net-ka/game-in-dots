import React from 'react';
import './form.scss'

const Form = props => (
    <div>
        <form onSubmit={props.drawField} className="settings-wrapper">
            <select name="gameMode" defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled hidden className="select-mode">Pick game mode</option>
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
            </select>
            <input type="text" name="name" placeholder="Enter your name" autoComplete="off" required></input>
            <button className="play-button">PLAY</button>
        </form>
    </div>

);

export default Form