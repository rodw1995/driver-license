import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  OnCreateLessonSubscription,
  OnCreateLessonSubscriptionVariables,
  OnDeleteLessonSubscription,
  OnDeleteLessonSubscriptionVariables,
  OnUpdateLessonSubscription,
  OnUpdateLessonSubscriptionVariables,
} from '../../API';
import { onCreateLesson, onDeleteLesson, onUpdateLesson } from '../../graphql/subscriptions';
import useOwner from '../../hooks/useOwner';
import useFetchLessonsCacheHelper, { removeFromCache, upsertToCache } from './useFetchLessonsCacheHelper';

const ON_CREATE_LESSON = gql(onCreateLesson);
const ON_UPDATE_LESSON = gql(onUpdateLesson);
const ON_DELETE_LESSON = gql(onDeleteLesson);

const toCacheOnCreate = upsertToCache<OnCreateLessonSubscription>(({ onCreateLesson: lesson }) => lesson);
const toCacheOnUpdate = upsertToCache<OnUpdateLessonSubscription>(({ onUpdateLesson: lesson }) => lesson);
const toCacheOnDelete = removeFromCache<OnDeleteLessonSubscription>(({ onDeleteLesson: lesson }) => lesson);

const LessonsSubscriber = () => {
  const apolloClient = useApolloClient();
  const owner = useOwner();
  const cacheHelper = useFetchLessonsCacheHelper();

  // onCreateLessons subscription
  useSubscription<OnCreateLessonSubscription, OnCreateLessonSubscriptionVariables>(ON_CREATE_LESSON, {
    variables: { owner },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        cacheHelper(toCacheOnCreate)(apolloClient, subscriptionData);
      }
    },
  });

  // onUpdateLessons subscription
  useSubscription<OnUpdateLessonSubscription, OnUpdateLessonSubscriptionVariables>(ON_UPDATE_LESSON, {
    variables: { owner },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        cacheHelper(toCacheOnUpdate)(apolloClient, subscriptionData);
      }
    },
  });

  // onDeleteLessons subscription
  useSubscription<OnDeleteLessonSubscription, OnDeleteLessonSubscriptionVariables>(ON_DELETE_LESSON, {
    variables: { owner },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        cacheHelper(toCacheOnDelete)(apolloClient, subscriptionData);
      }
    },
  });

  return null;
};

export default LessonsSubscriber;
