import React from 'react';
import './form.scss'

// class Form extends Component {

//     state = {
//         nameValue: ''
//     }

//     nameChange() {

//     }

//     render() {
        
//         return (
const Form = props => (
            <div>
                <form onSubmit={props.startGame}>
                    <select name="gameMode" defaultValue={'DEFAULT'} >
                        <option value="DEFAULT" disabled hidden>Pick game mode</option>
                        <option value="Easy">Easy</option>
                        <option value="Normal">Normal</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <input type="text" name="name" placeholder="Name" autoComplete="off" required></input>
                    <button>PLAY</button>
                </form> 
            </div>

);
//         )
//     }
// }

export default Form