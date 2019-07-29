import React from 'react';
import { AnnotationHelper } from 'common/AnnotationStats';

const ResolvedPlaceRows = props => {

  return (
    <React.Fragment>
      { props.occurrences.map(occurrence =>
        <tr key={ occurrence.toponym }>
          <td>{ props.uri }</td>
          <td>{ occurrence.toponym }</td>
          <td>{ occurrence.count }</td>
        </tr> 
      )}
    </React.Fragment>
  )

}

const getResolvedPlaces = annotations => {

  // Reduce annotation list to annotations with resolved places only
  const placeAnnotations = annotations.filter(annotation => {
    const placeBodies = annotation.bodies.filter(b => b.type === 'PLACE');
    const resolved = placeBodies.filter(body => body.uri);
    return resolved.length > 0;
  });

  return placeAnnotations.reduce((all, annotation) => {
    // Get quote and place bodies from this annotation
    const toponymBody = annotation.bodies.find(b => b.type === 'QUOTE' || b.type === 'TRANSCRIPTION');
    const placeBodies = annotation.bodies.filter(b => b.type === 'PLACE');

    // Convert to a row record
    const rows = placeBodies.map(body => ({
      toponym: toponymBody.value, uri: body.uri
    }));

    return all.concat(rows)
  }, []);

}

const groupResolvedPlaces = bodies => {
  const grouped = {};

  const add = (occurrence, prevOccurrences) => {
    // Is there a previous occurrence with the same toponym? -> increase counter
    const withSameToponym = prevOccurrences.find(o => o.toponym === occurrence.toponym);
    if (withSameToponym)
      withSameToponym.count++;
    else 
      prevOccurrences.push({ ...occurrence.toponym, count: 1 });

  }

  bodies.forEach(p => {
    if (grouped[p.uri])
      add(p, grouped[p.uri]);
    else
      grouped[p.uri] = [{ ...p, count: 1 }];
  });

  // To array
  const asArray = Object.keys(grouped).map(key => {
    const occurrences = grouped[key];
    const totalCount = occurrences.reduce((total, o) => {
      return total + o.count;
    }, 0);

    return { uri: key, totalCount, occurrences };
  });

  return asArray.sort((a, b) => {
    return b.totalCount - a.totalCount;
  });
}

const ResolvedPlaces = props => {

  const resolvedPlaceBodies = getResolvedPlaces(props.annotations);
  const grouped = groupResolvedPlaces(resolvedPlaceBodies);

  return (
    <div>
      <div className="panel w12">
        <h2>Resolved Places</h2>
        <div className="inner">
          <table>
            <thead>
              <tr>
                <th>Place ID</th>
                <th>Toponym in Document</th>
                <th># of Occurrences</th>
              </tr>
            </thead>
            <tbody>
              { grouped.map((r, idx) => <ResolvedPlaceRows key={idx} {...r} />) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

}

export default ResolvedPlaces;