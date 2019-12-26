import React, { Component, Fragment } from 'react';
import './play-field.scss'

// const path = 'https://rickandmortyapi.com/api/character';

class PlayField extends Component {

    // state = {
    //     allCellsArr: Array.from({ length: this.props.field })
    // }

    render() {
        const allCellsArr = Array.from({ length: this.props.field });

        return (
            <Fragment>
                <p className="message hidden">!</p>
                {this.props.field && <table className="field-wrapper">
                    <tbody>
                        {Array.prototype.map.call(allCellsArr, (elem, i) => {
                            return (
                                <tr key={`${i}tr`}>
                                    {Array.prototype.map.call(allCellsArr, (elem, k) => {
                                        return (
                                            <td key={`${k}td${i}`} className='field-cell field-cell-select'>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                }
            </Fragment>
        )
    }
}

export default PlayField