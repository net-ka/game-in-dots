import React from 'react';
import './leaders.scss'

const Leaders = props => {
    const { leaders } = props;

    return (
        <div className="leaders-wrapper">
            <p>Leaders Board</p>

            <table className="leaders-table-wrapper">
                <tbody>
                    <tr className='leader-row-head'>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
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