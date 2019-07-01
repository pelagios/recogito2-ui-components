import React from 'react';
import { ColumnChart } from 'react-chartkick';

const Timeline = props => {

  return (
    <div className="panel w12">
      <h2>Activity over time</h2>
      <div className="inner">
        <ColumnChart 
          stacked 
          height={170}
          data={props.activityPerUser} />
      </div>

      { props.loading && <div className="loading-mask" /> }
    </div>
  )

}

export default Timeline;