import React, { Component } from 'react';
import axios from 'axios';
import FlaggedEntities from './flagged/FlaggedEntites';
import ResolvedPlaces from './resolved/ResolvedPlaces';
import CompletionStats from './completion/CompletionStats';

import './App.scss';

export default class App extends Component {
  
  state = {
    document: this.props.config.document || 'g2pabicvwilcij',
    annotations: []
  }

  componentDidMount() {
    axios.get(`/api/document/${this.state.document}/annotations`)
      .then(response => this.setState({ annotations: response.data }));
  }

  render() {
    return (
      <>
        <div className="panel-row">
          <CompletionStats
            annotations={this.state.annotations} />

          <FlaggedEntities
            annotations={this.state.annotations} />
        </div>

        <ResolvedPlaces
          annotations={this.state.annotations} />
      </>
    )
  }

}