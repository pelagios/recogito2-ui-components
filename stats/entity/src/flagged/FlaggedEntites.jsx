import React, { Component } from 'react';

import './FlaggedEntities.scss';

const FlaggedEntityRow = props => {

  return (
    <tr>
      <td></td>
      <td></td>
    </tr>
  )

}

const getFlaggedPlaces = annotations => {
  const flaggedAnnotations = annotations.filter(a => 
    a.bodies.find(body => 
      body.status && body.status.value === 'NOT_IDENTIFIABLE'));
    
  const grouped = {};

  flaggedAnnotations.forEach(a => {
    const toponym = a.bodies.find(b => b.type === 'QUOTE' || b.type === 'TRANSCRIPTION').value;
    if (grouped[toponym])
      grouped[toponym]++;
    else 
      grouped[toponym] = 1;
  });

  const asArray = Object.keys(grouped).map(key => (
    { toponym: key, count: grouped[key] }
  ));

  return asArray.sort((a, b) => {
    return b.count - a.count;
  });
}

export default class FlaggedEntites extends Component {

  state = {
    computing: true,
    data: []
  }

  componentWillReceiveProps(next) {
    if (next.annotations !== this.props.annotations) {
      const data = getFlaggedPlaces(next.annotations);
      this.setState({ data, computing: false })
    }
  }

  render() {
    console.log(this.state.data);

    return (
      <div className="panel w7 flagged-toponyms">
        <h2>Flagged Toponyms</h2>
        <div className="inner">
          <table>
            <thead>
              <tr>
                <th>Toponym</th>
                <th># of Flagged Occurrences</th>
              </tr>
            </thead>

            <tbody>
              { this.state.data.map(t => 
                <tr key={t.toponym}>
                  <td>{t.toponym}</td>
                  <td>{t.count}</td>
                </tr>
              )}
            </tbody>
          </table>

          { this.state.computing && <div className="loading-mask"><div className="spinner" /></div> }
        </div>
      </div>
    )
  }

}