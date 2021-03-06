export class AnnotationHelper {

  constructor(annotation) {
    this._a = annotation;
  }

  getBodiesOfType(typeOrList) {
    return Array.isArray(typeOrList) ? 
      this._a.bodies.filter(b => typeOrList.includes(b.type)) :
      this._a.bodies.filter(b => b.type === typeOrList);
  }

  getCategoryBodies() {
    return this.getBodiesOfType(['PLACE', 'PERSON', 'EVENT']);
  }

  getTags() {
    return this.getBodiesOfType('TAG');
  }

  getComments() {
    return this.getBodiesOfType('COMMENT');
  }

}

export function countTags(annotations) {
  return annotations.reduce((total, annotation) => {
    return total + new AnnotationHelper(annotation).getTags().length;
  }, 0);
}

export function countComments(annotations) {
  return annotations.reduce((total, annotation) => {
    return total + new AnnotationHelper(annotation).getComments().length;
  }, 0); 
}

export function countRelations(annotations) {
  return annotations.reduce((total, annotation) => {
    return annotation.relations ? total + annotation.relations.length : total; 
  }, 0);
}

export function getContributors(annotations) {
  return annotations.reduce((contributors, annotation) => {
    const union = new Set([...contributors, ...annotation.contributors ]);
    return Array.from(union);
  }, []);
}

export function getBodiesByType(annotations) {
  const counts = {
    PLACE:  0,
    PERSON: 0,
    EVENT:  0,
    NONE:   0
  }

  annotations.forEach(a => {
    const categoryBodies = new AnnotationHelper(a).getCategoryBodies();
    if (categoryBodies.length > 0) {
      categoryBodies.forEach(b => {
        counts[b.type]++;
      });
    } else {
      counts.NONE++;
    }
  });

  return [
    [ 'Places', counts.PLACE ],
    [ 'People', counts.PERSON ],
    [ 'Events', counts.EVENT ],
    [ 'Uncategorized', counts.NONE ]
  ];
}

