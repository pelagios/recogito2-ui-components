import React, { Component } from 'react';
import { PieChart } from 'react-chartkick';
import NumberFormat from 'react-number-format';
import { 
  countTags, 
  countComments, 
  countRelations, 
  getContributors, 
  getBodiesByType } from 'common/AnnotationStats';

import './SummaryStats.scss';

const PIE_COLORS = [
  '#57c17b',
  '#6f87d8',
  '#bc51bc',
  '#afafaf'
];

// Shorthand
const Number = props => {

  return (
    <NumberFormat
      thousandSeparator
      displayType="text"
      value={props.value} />
  )

}

export default class SummaryStats extends Component {

  state = {
    computing: true,
    tags: null,
    comments: null,
    relations: null,
    contributors: null,
    bodiesByType: {}
  }

  componentWillReceiveProps(next) {
    if (this.props.annotations != next.annotations)
      this.recompute();
  }

  recompute() {
    new Promise(resolve => {
      const tags = countTags(this.props.annotations);
      const comments = countComments(this.props.annotations);
      const relations = countRelations(this.props.annotations);
      const contributors = getContributors(this.props.annotations).length;
      const bodiesByType = getBodiesByType(this.props.annotations);
      resolve({ tags, comments, relations, contributors, bodiesByType });
    }).then(stats => this.setState({ ...stats, computing: false }));
  }

  render() {
    return (
      <div className="panel w4">
        <h2>Summary</h2>
  
        <div className="inner summary-stats">
          <div>
            <table>
              <tbody>
                <tr>
                  <td><Number value={this.props.annotations.length} /></td>
                  <td>Annotations</td>
                </tr>
  
                <tr>
                  <td><Number value={this.state.tags} /></td>
                  <td>Tags</td>
                </tr>
  
                <tr>
                  <td><Number value={this.state.comments} /></td>
                  <td>Comments</td>
                </tr>
  
                <tr>
                  <td><Number value={this.state.relations} /></td>
                  <td>Relations</td>
                </tr>
  
                <tr>
                  <td><Number value={this.state.contributors} /></td>
                  <td>Contributors</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <PieChart 
            id="annotations-by-category"
            width="140px" 
            height="140px"
            legend={false} 
            colors={PIE_COLORS}
            data={this.state.bodiesByType} />
  
          { this.state.computing && <div className="loading-mask" /> }
        </div>
      </div>
    )
  
  }

}