import React from 'react';
import { BarChart } from 'react-chartkick';

import './ContributorsChart.scss';

const ContributorsChart = props => {

  return (
    <div className="panel w8">
      <h2>Contributors</h2>
      <div className="inner contributors-chart">
        <BarChart
          height={190} 
          data={props.editsPerUser} />
      </div>

      { props.loading && <div className="loading-mask" /> }
    </div>
  )

}

export default ContributorsChart;