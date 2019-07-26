import React from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

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

  const data = props.history.map(t => {
    return { date: formatDate(new Date(t[0])), Edits: t[1] };
  });

  return (
    <div className="panel w12">
      <h2>Activity over time</h2>
      <div className="inner timeline">
        <AreaChart data={data} width={920} height={180}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Area type="monotone" dataKey="Edits" stroke="#4483c4" fill="#4483c4" />
        </AreaChart>
      </div>
    </div>
  )

}

export default Timeline;