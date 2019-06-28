class AnnotationHelper {

  constructor(annotation) {
    this._a = annotation;
  }

  getBodiesOfType(t) {
    return this._a.bodies.filter(b => {
      return b.type === t;
    })
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

  editsPerContributor() {

  }

  activityOverTime() {

  }

}