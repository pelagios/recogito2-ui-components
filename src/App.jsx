import React, { Component } from 'react';
import axios from 'axios';
import { BarChart, ColumnChart, PieChart } from 'react-chartkick';
import 'chart.js';
import AnnotationStats from './AnnotationStats';

import './App.scss';

const COLORS = [
  '#57c17b',
  '#6f87d8',
  '#bc51bc',
  '#afafaf'
];

export default class App extends Component {
  
  state = {
    document: 'oflmsfz9augu6l',
    annotations: []
  }

  componentDidMount() {
    axios.get(`/api/document/${this.state.document}/annotations`).then(response => {
      console.log(response.data);
      this.setState({ annotations: response.data });
    })
  }

  render() {
    const stats = new AnnotationStats(this.state.annotations);

    return (
      <div>
        <div className="panel">
          <h2>Summary</h2>
          <div className="inner summary-stats">
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>{stats.total()}</td><td>Annotations</td>
                  </tr>

                  <tr>
                    <td>{stats.totalTags()}</td><td>Tags</td>
                  </tr>

                  <tr>
                    <td>{stats.totalComments()}</td><td>Comments</td>
                  </tr>

                  <tr>
                    <td>{stats.totalRelations()}</td><td>Relations</td>
                  </tr>

                  <tr>
                    <td>{stats.contributors().length}</td><td>Contributors</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <PieChart 
              id="annotations-by-category"
              width="170px" 
              height="170px"
              legend={false} 
              colors={COLORS}
              data={[[ 'Places', 44 ], [ 'People', 23], [ 'Events', 12 ], [ 'Uncategorized', 28 ]]} />
          </div>
        </div>

        <div className="panel">
          <h2>Contributors</h2>
          <div className="inner">
            <BarChart
              xtitle="Total edits" 
              data={[["rainer", 5], ["elton", 27]]} />
          </div>
        </div>

        <div className="panel">
          <h2>Activity over time</h2>
          <div className="inner">
            <ColumnChart stacked data={[
              { name: 'foo', data: [["Sun", 32, 15], ["Mon", 46], ["Tue", 28]] },
              { name: 'bar', data: [["Sun", 1], ["Mon", 16], ["Tue", 18]] }
            ]} />
          </div>
        </div>
      </div>
    )
  }

}