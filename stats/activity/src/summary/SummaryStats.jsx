import React from 'react';
import { PieChart } from 'react-chartkick';

import './SummaryStats.scss';

const PIE_COLORS = [
  '#57c17b',
  '#6f87d8',
  '#bc51bc',
  '#afafaf'
];

const SummaryStats = props => {

  return (
    <div className="panel w4">
      <h2>Summary</h2>

      <div className="inner summary-stats">
        <div>
          <table>
            <tbody>
              <tr>
                <td>{props.annotations}</td>
                <td>Annotations</td>
              </tr>

              <tr>
                <td>{props.tags}</td>
                <td>Tags</td>
              </tr>

              <tr>
                <td>{props.comments}</td>
                <td>Comments</td>
              </tr>

              <tr>
                <td>{props.relations}</td>
                <td>Relations</td>
              </tr>

              <tr>
                <td>{props.contributors}</td>
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