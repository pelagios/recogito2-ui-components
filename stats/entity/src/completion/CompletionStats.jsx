import React, { Component } from 'react';
import { PieChart } from 'react-chartkick';
import NumberFormat from 'react-number-format';

import 'chart.js';
import './CompletionStats.scss';

const PIE_COLORS = [
  '#57c17b',
  '#ffcd03',
  '#afafaf'
];

const computeVerificationStats = annotations => {
  const stats = {
    VERIFIED: 0,
    FLAGGED: 0,
    UNVERIFIED: 0
  };

  annotations.forEach(a => {
    const placeBodies = a.bodies.filter(b => b.type === 'PLACE');

    const isVerified = placeBodies.find(b => b.status && b.status.value === 'VERIFIED');
    const isFlagged = placeBodies.find(b => b.status && b.status.value === 'NOT_IDENTIFIABLE');
    
    if (isVerified || isFlagged) {
      if (isVerified) stats.VERIFIED++;
      if (isFlagged) stats.FLAGGED++;
    } else if (placeBodies.length > 0) {
      stats.UNVERIFIED++;
    }
  });

  return stats;
}

export default class CompletionStats extends Component {

  state = {
    computing: true,
    stats: {
      VERIFIED: 0,
      FLAGGED: 0,
      UNVERIFIED: 0
    },
    pieChart: []
  }

  componentWillReceiveProps(next) {
    if (next.annotations !== this.props.annotations) {
      const stats = computeVerificationStats(next.annotations);
      const pieChart = [
        [ 'Verified', stats.VERIFIED ],
        [ 'Flagged', stats.FLAGGED ],
        [ 'Unverified', stats.UNVERIFIED ]
      ];

      this.setState({ stats, pieChart, computing: false })
    }
  }

  render() {
    const { VERIFIED, FLAGGED, UNVERIFIED } = this.state.stats;
    const total = VERIFIED + FLAGGED + UNVERIFIED;

    return (
      <div className="panel w7 completion-stats">
        <h2>Completion</h2>
        <div className="inner">
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <NumberFormat 
                      thousandSeparator displayType="text" value={total} />
                  </td>
                  <td>Places tagged</td>
                </tr>
  
                <tr>
                  <td>
                    <NumberFormat 
                      thousandSeparator displayType="text" value={VERIFIED} />
                  </td>
                  <td>
                    Verified ({total && (100 * VERIFIED / total).toFixed(2)}%)
                  </td>
                </tr>
  
                <tr>
                  <td>
                    <NumberFormat 
                      thousandSeparator displayType="text" value={FLAGGED} />
                  </td>
                  <td>
                    Flagged ({total && (100 * FLAGGED / total).toFixed(2)}%)
                  </td>
                </tr>  
              </tbody>
            </table>
          </div>

          <PieChart 
            id="verification-chart"
            width="140px" 
            height="140px"
            legend={false} 
            colors={PIE_COLORS}
            data={this.state.pieChart} />

          { this.state.computing && <div className="loading-mask"><div className="spinner" /></div> }
        </div>
      </div>
    )
  }

}