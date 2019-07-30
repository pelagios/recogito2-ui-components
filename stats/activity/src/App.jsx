import React, { Component } from 'react';
import axios from 'axios';
import SummaryStats from './summary/SummaryStats';
import ContributorsChart from './contributors/ContributorsChart';
import Timeline from './timeline/Timeline';

import 'chart.js';
import './App.scss';

export default class App extends Component {
  
  state = {
    document: this.props.config.document || 'oflmsfz9augu6l',
    annotations: [],
    editsPerUser: [], 
    editHistory: [],
    selectedUser: null
  }

  componentDidMount() {
    axios.get(`/api/document/${this.state.document}/annotations`)
      .then(response => this.setState({ annotations: response.data }));

    axios.get(`/api/document/${this.state.document}/contributions`).then(response => {
      const editsPerUser = response.data.by_user.map(t => [ t.username, t.value ]);
      const editHistory = response.data.contribution_history;
      this.setState({ editsPerUser, editHistory });
    });
  }

  selectUser = username => {
    this.setState({ selectedUser: username });
  }

  render() {
    return (
      <>
        <div className="panel-row">
          <SummaryStats
            annotations={this.state.annotations} />

          <ContributorsChart
            editsPerUser={this.state.editsPerUser} 
            onSelect={this.selectUser} />
        </div>

        <Timeline
          history={this.state.editHistory} 
          forUser={this.state.selectedUser} 
          clearFilter={() => this.selectUser() }/>
      </>
    )
  }

}