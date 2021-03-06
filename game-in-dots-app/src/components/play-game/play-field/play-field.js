import React, { Fragment } from 'react';
import './play-field.scss'

const PlayField = props => {
    const allCellsArr = Array.from({ length: props.field });

    return (
        <Fragment>
            <p className="message hidden">!</p>
            <div className="field-wrapper">
                {props.field && <table className="field-table">
                    <tbody>
                        {allCellsArr.map((elem, i) => {
                            return (
                                <tr key={`${i}tr`}>
                                    {allCellsArr.map((elem, k) => {
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
                {!props.field && <table className="field-table">
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                }
            </div>
        </Fragment>
    )

}

export default PlayField