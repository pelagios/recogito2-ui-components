class AnnotationHelper {

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

export default class AnnotationStats {

  constructor(annotations) {
    this._annotations = annotations;
  }

  total() {
    return this._annotations.length;
  }

  totalTags() {
    if (!this._totalTags) {
      this._totalTags = this._annotations.reduce((total, annotation) => {
        return total + new AnnotationHelper(annotation).getTags().length;
      }, 0);
    }

    return this._totalTags;
  }

  totalComments() {
    if (!this._totalComments) {
      this._totalComments = this._annotations.reduce((total, annotation) => {
        return total + new AnnotationHelper(annotation).getComments().length;
      }, 0);
    }

    return this._totalComments;
  }

  bodiesByType() {
    if (!this._bodiesByType) {
      const counts = {
        PLACE:  0,
        PERSON: 0,
        EVENT:  0,
        NONE:   0
      }

      this._annotations.forEach(a => {
        const categoryBodies = new AnnotationHelper(a).getCategoryBodies();
        if (categoryBodies.length > 0) {
          categoryBodies.forEach(b => {
            counts[b.type]++;
          });
        } else {
          counts.NONE++;
        }
      });

      this._bodiesByType = [
        [ 'Places', counts.PLACE ],
        [ 'People', counts.PERSON ],
        [ 'Events', counts.EVENT ],
        [ 'Uncategorized', counts.NONE ]
      ];
    }

    return this._bodiesByType;
  }

  totalRelations() {
    if (!this._totalRelations) {
      this._totalRelations = this._annotations.reduce((total, annotation) => {
        return annotation.relations ? total + annotation.relations.length : total; 
      }, 0)
    }

    return this._totalRelations;
  }

  contributors() {
    if (!this._contributors) {
      this._contributors = this._annotations.reduce((contributors, annotation) => {
        const union = new Set([...contributors, ...annotation.contributors ]);
        return Array.from(union);
      }, []);
    }

    return this._contributors;
  }

}