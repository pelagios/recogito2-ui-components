import React, { Component } from 'react';
import axios from 'axios';
import { BarChart, ColumnChart, PieChart } from 'react-chartkick';
import 'chart.js';
import AnnotationStats from 'common/AnnotationStats';

import './App.scss';

const COLORS = [
  '#57c17b',
  '#6f87d8',
  '#bc51bc',
  '#afafaf'
];

export default class App extends Component {
  
  state = {
    document: this.props.config.document || 'asckvtl43e9jca',
    annotations: [],
    editsPerUser: [], 
    activityPerUser: []
  }

  componentDidMount() {
    axios.get(`/api/document/${this.state.document}/annotations`).then(response => {
      this.setState({ annotations: response.data });
    });

    axios.get(`/api/document/${this.state.document}/contributions`).then(response => {
      const editsPerUser = response.data.by_user.map(t => [ t.username, t.value ]);

      const activeUsers = response.data.contribution_history.reduce((allUsers, tuple) => {
        const users = tuple[2].map(t => t.username);
        const union = new Set([...allUsers, ...users ]);
        return Array.from(union);
      }, []);
      
      const activityPerUser = activeUsers.map(user => {
        const timeline = response.data.contribution_history.map(tuple => {
          const date = tuple[0];
          const contributions = tuple[2].filter(t => t.username === user);
          return contributions.length === 1 ? [ date, contributions[0].value ] : [ date, 0 ]; 
        });

        return { name: user, data: timeline };
      });

      this.setState({ editsPerUser, activityPerUser });
    });
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
              data={stats.bodiesByType()} />
          </div>
        </div>

        <div className="panel">
          <h2>Contributors</h2>
          <div className="inner">
            <BarChart
              xtitle="Total edits" 
              data={this.state.editsPerUser} />
          </div>
        </div>

        <div className="panel">
          <h2>Activity over time</h2>
          <div className="inner">
            <ColumnChart stacked data={this.state.activityPerUser} />
          </div>
        </div>
      </div>
    )
  }

}