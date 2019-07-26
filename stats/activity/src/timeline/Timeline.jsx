import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';

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

  /* const labels = props.history.map(t => {
    return formatDate(new Date(t[0]));
  }); */

  const data = props.history.map(t => {
    return { date: formatDate(new Date(t[0])), value: t[1] };
  });

  // const data = { labels: labels, series: [ series ]};

  const options = { 
    fullWidth: true,
    chartPadding: {
      top:26
    },
    showArea: true,
    axisY: {
      onlyInteger: true
    },
    axisX: { 
      showGrid:false // ,
      // labelInterpolationFnc: (val, idx) => idx % 4  === 0 ? val : null
    }
  };

  return (
    <div className="panel w12">
      <h2>Activity over time</h2>
      <div className="inner timeline">
        <AreaChart data={data} width={940} height={180}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Area type="monotone" dataKey="value" />
        </AreaChart>
      </div>
    </div>
  )

}

export default Timeline;