import { useMutation, useQuery } from '@apollo/react-hooks';
import useCancelablePromise from '@rodw95/use-cancelable-promise';
import gql from 'graphql-tag';
import React, { useCallback } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {
  GetLessonQuery,
  GetLessonQueryVariables,
  UpdateLessonMutation,
  UpdateLessonMutationVariables,
} from '../../../API';
import { LESSONS_ROUTE } from '../../../app/routes';
import LoadingPage from '../../../components/LoadingPage';
import { updateLesson } from '../../../graphql/mutations';
import { getLesson } from '../../../graphql/queries';
import { formDataToLesson, LessonFormData, lessonToFormData, toLesson } from '../lessonType';
import LessonFormPage from './LessonFormPage';

const FETCH_LESSON = gql(getLesson);
const UPDATE_LESSON = gql(updateLesson);

const LessonUpdateContainer = () => {
  const makeCancelable = useCancelablePromise();
  const { id } = useParams<{ id: string }>();
  const { loading, data: getLessonQueryData } = useQuery<GetLessonQuery, GetLessonQueryVariables>(FETCH_LESSON, {
    variables: { id },
  });

  const [update] = useMutation<UpdateLessonMutation, UpdateLessonMutationVariables>(UPDATE_LESSON);
  const action = useCallback(
    (formData: LessonFormData) => makeCancelable(update({
      variables: {
        input: { id, ...formDataToLesson(formData) },
      },
    })),
    [makeCancelable, update, id],
  );

  if (loading) {
    return <LoadingPage />;
  }

  if (!getLessonQueryData || !getLessonQueryData.getLesson) {
    return <Redirect to={LESSONS_ROUTE} />;
  }

  return (
    <LessonFormPage
      data={lessonToFormData(toLesson(getLessonQueryData.getLesson))}
      action={action}
    />
  );
};

export default LessonUpdateContainer;
