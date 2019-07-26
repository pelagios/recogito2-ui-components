import React from 'react';
import ChartistGraph from 'react-chartist';

import './Timeline.scss';

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sept', 'Oct', 'Nov', 'Dec' ];

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  return `${MONTH_NAMES_SHORT[month]} ${day}`;
}

const Timeline = props => {

  const labels = props.history.map(t => {
    return formatDate(new Date(t[0]));
  });

  const series = props.history.map(t => {
    return t[1];
  });

  const data = { labels: labels, series: [ series ]};

  const options = { 
    fullWidth: true,
    chartPadding: {
      top:26
    },
    axisX: { 
      showGrid:false,
      labelInterpolationFnc: (val, idx) => idx % 4  === 0 ? val : null
    }
  };

  return (
    <div className="panel w12">
      <h2>Activity over time</h2>
      <div className="inner timeline">
        <ChartistGraph data={data} options={options} type="Bar" />
      </div>
    </div>
  )

}

export default Timeline;