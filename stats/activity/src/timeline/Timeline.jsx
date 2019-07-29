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

  const data = props.forUser ? props.history.map(t => {
      const found = t[2].find(t => t.username === props.forUser);
      const edits = found ? found.value : 0;
      return { date: formatDate(new Date(t[0])), Edits: edits };
    }) : props.history.map(t => {
      return { date: formatDate(new Date(t[0])), Edits: t[1] };
    });

  return (
    <div className="panel w12">
      <h2>
        Activity over time
        { props.forUser && 
          <span 
            className="filter"
            onClick={props.clearFilter}>{props.forUser}</span> 
        }
      </h2>

      <div className="inner timeline">
        <AreaChart data={data} width={700} height={180}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Area 
            type="monotone" 
            dataKey="Edits" 
            stroke="#4483c4" 
            fill="#4483c4" 
            animationDuration={200} />
        </AreaChart>
      </div>
    </div>
  )

}

export default Timeline;