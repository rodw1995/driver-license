import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useCallback } from 'react';
import { CreateLessonMutation, CreateLessonMutationVariables } from '../../../API';
import { createLesson } from '../../../graphql/mutations';
import useCancelablePromise from '../../../hooks/useCancelablePromise';
import useOwner from '../../../hooks/useOwner';
import { formDataToLesson, LessonFormData } from '../lessonType';
import useFetchLessonsCacheHelper, { upsertToCache } from '../useFetchLessonsCacheHelper';
import LessonFormPage from './LessonFormPage';

const CREATE_LESSON = gql(createLesson);
const toCacheOnCreate = upsertToCache<CreateLessonMutation>(({ createLesson: lesson }) => lesson);

const LessonCreateContainer = () => {
  const makeCancelable = useCancelablePromise();
  const owner = useOwner();

  const [create] = useMutation<CreateLessonMutation, CreateLessonMutationVariables>(CREATE_LESSON);
  const cacheHelper = useFetchLessonsCacheHelper();

  const action = useCallback(
    (form: LessonFormData) => makeCancelable(create({
      variables: {
        input: { owner, ...formDataToLesson(form) },
      },
      update: cacheHelper(toCacheOnCreate),
    })),
    [makeCancelable, create, owner, cacheHelper],
  );

  return <LessonFormPage action={action} />;
};

export default LessonCreateContainer;
