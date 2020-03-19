import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useSnackbar } from 'notistack';
import { propEq } from 'ramda';
import React, { useCallback } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { DeleteLessonMutation } from '../../../API';
import { LESSON_CREATE_ROUTE, LESSON_UPDATE_ROUTE } from '../../../app/consumers/routes';
import { deleteLesson } from '../../../graphql/mutations';
import useFetchLessons from '../useFetchLessons';
import useFetchLessonsCacheHelper, { removeFromCache } from '../useFetchLessonsCacheHelper';
import LessonsPage from './LessonsPage';

const DELETE_LESSON = gql(deleteLesson);
const toCacheOnDelete = removeFromCache<DeleteLessonMutation>(({ deleteLesson: lesson }) => lesson);

const LessonsContainer = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, error, lessons, refetch } = useFetchLessons();
  const [removeLesson] = useMutation(DELETE_LESSON);
  const cacheHelper = useFetchLessonsCacheHelper();

  const getState = () => {
    if (error) {
      return 'error';
    }

    return loading ? 'loading' : 'loaded';
  };

  const onRefetch = useCallback(() => refetch(), [refetch]);
  const onDelete = useCallback(
    (id: string) => removeLesson({
      variables: { input: { id } },
      optimisticResponse: {
        deleteLesson: {
          __typename: 'Lesson',
          ...lessons.find(propEq('id', id)),
        },
      },
      update: cacheHelper(toCacheOnDelete),
    })
      .then(() => {
        enqueueSnackbar('Lesson is deleted', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Could not delete lesson', { variant: 'error' });
      }),
    [enqueueSnackbar, removeLesson, cacheHelper, lessons],
  );

  const onNavigateAdd = useCallback(() => {
    history.push(LESSON_CREATE_ROUTE);
  }, [history]);

  const onNavigateEdit = useCallback((id: string) => {
    history.push(generatePath(LESSON_UPDATE_ROUTE, { id }));
  }, [history]);

  return (
    <LessonsPage
      state={getState()}
      lessons={lessons}
      onRefetch={onRefetch}
      onNavigateAdd={onNavigateAdd}
      onNavigateEdit={onNavigateEdit}
      onDelete={onDelete}
    />
  );
};

export default LessonsContainer;
