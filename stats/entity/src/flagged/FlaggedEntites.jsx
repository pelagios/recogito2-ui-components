import React, { Component } from 'react';

const FlaggedEntityRow = props => {

  return (
    <tr>
      <td></td>
      <td></td>
    </tr>
  )

}

export default class FlaggedEntites extends Component {

  state = {
    computing: true
  }

  render() {
    return (
      <div className="panel w7">
        <h2>Flagged Toponyms</h2>
        <div className="inner">
          
        </div>
      </div>
    )
  }

}