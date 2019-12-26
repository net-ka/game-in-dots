import React, { Fragment } from 'react';
import './leaders.scss'

const Leaders = props => {

    const { leaders } = props;
    return (
        <div className="leaders-wrapper">
            <p>Leader Board</p>

            <table className="leaders-table-wrapper">
                <thead className='leader-row-head'>
                    <td>Name</td>
                    <td>Date</td>
                </thead>
                <tbody>
                    {leaders.map(({ id, winner, date }) => {
                        return (
                            <tr key={id} className='leader-row'>
                                <td className='leader-name'>{winner}</td>
                                <td className='leader-date'>{date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        
        </div>
    );
}

export default Leaders