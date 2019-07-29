import React from 'react';
import NumberFormat from 'react-number-format';

import './ContributorsChart.scss';

const ContributorsChart = props => {

  const maxScore = Math.max(...props.editsPerUser.map(arr => arr[1]));

  const rows = props.editsPerUser.map(arr =>
    <tr key={arr[0]}>
      <td onClick={() => props.onSelect(arr[0])}>{arr[0]}</td>
      <td>
        <div className="meter">
          <div 
            className="bar rounded" 
            style={{ width: `${100 * arr[1] / maxScore}%` }}></div>
        </div>
      </td>
      <td>
        <NumberFormat
          thousandSeparator
          displayType="text"
          value={arr[1]} /> Edits
      </td>
    </tr>
  );

  return (
    <div className="panel w7">
      <h2>Contributors</h2>
      <div className="inner contributors-chart">
        <table>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default ContributorsChart;