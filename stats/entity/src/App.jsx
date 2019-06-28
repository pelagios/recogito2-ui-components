import React, { Component } from 'react';
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

  render() {
    const stats = new AnnotationStats(this.state.annotations);

    return (
      <div>
        <div className="panel">
          <h2>Top Places</h2>
          <div className="inner">
          </div>
        </div>
      </div>
    )
  }

}