// tslint:disable
// this is an auto generated file. This will be overwritten

export const getLesson = /* GraphQL */ `
  query GetLesson($id: ID!) {
    getLesson(id: $id) {
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
export const listLessons = /* GraphQL */ `
  query ListLessons(
    $filter: ModelLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        date
        duration
        focusPoints
        score
        retrospective
      }
      nextToken
    }
  }
`;
export const lessonsByOwner = /* GraphQL */ `
  query LessonsByOwner(
    $owner: String
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lessonsByOwner(
      owner: $owner
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        date
        duration
        focusPoints
        score
        retrospective
      }
      nextToken
    }
  }
`;
