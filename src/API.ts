/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLessonInput = {
  id?: string | null,
  owner: string,
  date: string,
  duration: number,
  focusPoints?: Array< string > | null,
  score?: number | null,
  retrospective?: string | null,
};

export type ModelLessonConditionInput = {
  date?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  focusPoints?: ModelStringInput | null,
  score?: ModelIntInput | null,
  retrospective?: ModelStringInput | null,
  and?: Array< ModelLessonConditionInput | null > | null,
  or?: Array< ModelLessonConditionInput | null > | null,
  not?: ModelLessonConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateLessonInput = {
  id: string,
  owner?: string | null,
  date?: string | null,
  duration?: number | null,
  focusPoints?: Array< string > | null,
  score?: number | null,
  retrospective?: string | null,
};

export type DeleteLessonInput = {
  id?: string | null,
};

export type ModelLessonFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  date?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  focusPoints?: ModelStringInput | null,
  score?: ModelIntInput | null,
  retrospective?: ModelStringInput | null,
  and?: Array< ModelLessonFilterInput | null > | null,
  or?: Array< ModelLessonFilterInput | null > | null,
  not?: ModelLessonFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateLessonMutationVariables = {
  input: CreateLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type CreateLessonMutation = {
  createLesson:  {
    __typename: "Lesson",
    id: string,
    owner: string,
    date: string,
    duration: number,
    focusPoints: Array< string > | null,
    score: number | null,
    retrospective: string | null,
  } | null,
};

export type UpdateLessonMutationVariables = {
  input: UpdateLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type UpdateLessonMutation = {
  updateLesson:  {
    __typename: "Lesson",
    id: string,
    owner: string,
    date: string,
    duration: number,
    focusPoints: Array< string > | null,
    score: number | null,
    retrospective: string | null,
  } | null,
};

export type DeleteLessonMutationVariables = {
  input: DeleteLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type DeleteLessonMutation = {
  deleteLesson:  {
    __typename: "Lesson",
    id: string,
    owner: string,
    date: string,
    duration: number,
    focusPoints: Array< string > | null,
    score: number | null,
    retrospective: string | null,
  } | null,
};

export type GetLessonQueryVariables = {
  id: string,
};

export type GetLessonQuery = {
  getLesson:  {
    __typename: "Lesson",
    id: string,
    owner: string,
    date: string,
    duration: number,
    focusPoints: Array< string > | null,
    score: number | null,
    retrospective: string | null,
  } | null,
};

export type ListLessonsQueryVariables = {
  filter?: ModelLessonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLessonsQuery = {
  listLessons:  {
    __typename: "ModelLessonConnection",
    items:  Array< {
      __typename: "Lesson",
      id: string,
      owner: string,
      date: string,
      duration: number,
      focusPoints: Array< string > | null,
      score: number | null,
      retrospective: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type LessonsByOwnerQueryVariables = {
  owner?: string | null,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLessonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LessonsByOwnerQuery = {
  lessonsByOwner:  {
    __typename: "ModelLessonConnection",
    items:  Array< {
      __typename: "Lesson",
      id: string,
      owner: string,
      date: string,
      duration: number,
      focusPoints: Array< string > | null,
      score: number | null,
      retrospective: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateLessonSubscriptionVariables = {
  owner: string,
};

export type OnCreateLessonSubscription = {
  onCreateLesson:  {
    __typename: "Lesson",
    id: string,
    owner: string,
    date: string,
    duration: number,
    focusPoints: Array< string > | null,
    score: number | null,
    retrospective: string | null,
  } | null,
};

export type OnUpdateLessonSubscriptionVariables = {
  owner: string,
};

export type OnUpdateLessonSubscription = {
  onUpdateLesson:  {
    __typename: "Lesson",
    id: string,
    owner: string,
    date: string,
    duration: number,
    focusPoints: Array< string > | null,
    score: number | null,
    retrospective: string | null,
  } | null,
};

export type OnDeleteLessonSubscriptionVariables = {
  owner: string,
};

export type OnDeleteLessonSubscription = {
  onDeleteLesson:  {
    __typename: "Lesson",
    id: string,
    owner: string,
    date: string,
    duration: number,
    focusPoints: Array< string > | null,
    score: number | null,
    retrospective: string | null,
  } | null,
};
