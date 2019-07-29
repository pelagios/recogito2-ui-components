import React, { Component } from 'react';
import FlaggedEntities from './flagged/FlaggedEntites';
import axios from 'axios';

import './App.scss';

export default class App extends Component {
  
  state = {
    document: this.props.config.document || 'oflmsfz9augu6l',
    annotations: []
  }

  componentDidMount() {
    axios.get(`/api/document/${this.state.document}/annotations`)
      .then(response => this.setState({ annotations: response.data }));
  }

  render() {
    return (
      <>
        <FlaggedEntities
            annotations={this.state.annotations} />
      </>
    )
  }

}