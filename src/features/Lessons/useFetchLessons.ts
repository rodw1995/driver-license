import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { LessonsByOwnerQuery, LessonsByOwnerQueryVariables } from '../../API';
import { lessonsByOwner } from '../../graphql/queries';
import notNil from '../../utils/notNil';
import useFetchLessonsVariables from './useFetchLessonsVariables';

export const LESSONS_BY_OWNER = gql(lessonsByOwner);

export default () => {
  const variables = useFetchLessonsVariables();
  const { data, ...rest } = useQuery<LessonsByOwnerQuery, LessonsByOwnerQueryVariables>(LESSONS_BY_OWNER, {
    variables,
  });

  return {
    ...rest,
    lessons: data?.lessonsByOwner?.items?.filter(notNil) || [],
  };
};
