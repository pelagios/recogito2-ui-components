import React from 'react';
import { PieChart } from 'react-chartkick';
import NumberFormat from 'react-number-format';

import './SummaryStats.scss';

const PIE_COLORS = [
  '#57c17b',
  '#6f87d8',
  '#bc51bc',
  '#afafaf'
];

// Shorthand
const Number = props => {

  return (
    <NumberFormat
      thousandSeparator
      displayType="text"
      value={props.value} />
  )

}

const SummaryStats = props => {

  return (
    <div className="panel w4">
      <h2>Summary</h2>

      <div className="inner summary-stats">
        <div>
          <table>
            <tbody>
              <tr>
                <td><Number value={props.annotations} /></td>
                <td>Annotations</td>
              </tr>

              <tr>
                <td><Number value={props.tags} /></td>
                <td>Tags</td>
              </tr>

              <tr>
                <td><Number value={props.comments} /></td>
                <td>Comments</td>
              </tr>

              <tr>
                <td><Number value={props.relations} /></td>
                <td>Relations</td>
              </tr>

              <tr>
                <td><Number value={props.contributors} /></td>
                <td>Contributors</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PieChart 
          id="annotations-by-category"
          width="140px" 
          height="140px"
          legend={false} 
          colors={PIE_COLORS}
          data={props.bodiesByType} />

        { props.loading && <div className="loading-mask" /> }
      </div>
    </div>
  )

}

export default SummaryStats;