// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateLesson = /* GraphQL */ `
  subscription OnCreateLesson($owner: String!) {
    onCreateLesson(owner: $owner) {
      id
      owner
      date
      duration
      focusPoints
      score
      retrospective
    }
  }
`;
export const onUpdateLesson = /* GraphQL */ `
  subscription OnUpdateLesson($owner: String!) {
    onUpdateLesson(owner: $owner) {
      id
      owner
      date
      duration
      focusPoints
      score
      retrospective
    }
  }
`;
export const onDeleteLesson = /* GraphQL */ `
  subscription OnDeleteLesson($owner: String!) {
    onDeleteLesson(owner: $owner) {
      id
      owner
      date
      duration
      focusPoints
      score
      retrospective
    }
  }
`;
