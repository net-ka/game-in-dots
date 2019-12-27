import React, { Component, Fragment } from 'react';
import './play-field.scss'

class PlayField extends Component {

    render() {
        const allCellsArr = Array.from({ length: this.props.field });

        return (
            <Fragment>
                <p className="message hidden">!</p>
                <div className="field-wrapper">
                {this.props.field && <table className="field-table">
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
                </div>
            </Fragment>
        )
    }
}

export default PlayField