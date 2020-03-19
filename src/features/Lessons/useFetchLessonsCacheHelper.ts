import { MutationUpdaterFn } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { always, append, descend, pipe, prop, propEq, reject, sort, tryCatch } from 'ramda';
import { useCallback } from 'react';
import { LessonsByOwnerQuery } from '../../API';
import notNil from '../../utils/notNil';
import { LESSONS_BY_OWNER } from './useFetchLessons';
import useFetchLessonsVariables from './useFetchLessonsVariables';

type LessonByOwnerItem = NonNullable<NonNullable<LessonsByOwnerQuery['lessonsByOwner']>['items']>[0];
type FetchDataResult<T> = Readonly<NonNullable<FetchResult<T>['data']>>;

export type FetchLessonsCacheCallback<T> = (
  items: Array<NonNullable<LessonByOwnerItem>>,
  result: FetchDataResult<T>,
) => Array<NonNullable<LessonByOwnerItem>>;

type FetchLessonsCacheHelperCallback<T> = (result: FetchDataResult<T>) => LessonByOwnerItem;

export const upsertToCache = <T>(
  callback: FetchLessonsCacheHelperCallback<T>,
): FetchLessonsCacheCallback<T> => (items, result) => {
    const lessonToUpsert = callback(result);
    if (lessonToUpsert) {
      // A little bit of overusing Ramda functions but it's just for practice purposes
      return pipe(
        reject<NonNullable<LessonByOwnerItem>, 'array'>(propEq('id', lessonToUpsert.id)),
        append(lessonToUpsert),
      )(items);
    }

    return items;
  };

export const removeFromCache = <T>(
  callback: FetchLessonsCacheHelperCallback<T>,
): FetchLessonsCacheCallback<T> => (items, result) => {
    const lessonToRemove = callback(result);
    if (lessonToRemove) {
      return reject(propEq('id', lessonToRemove.id))(items);
    }

    return items;
  };

const byDateString = descend(prop('date'));

export default () => {
  const variables = useFetchLessonsVariables();

  return useCallback((<T>(callback: FetchLessonsCacheCallback<T>): MutationUpdaterFn<T> => (proxy, result) => {
    if (result.data) {
      // readQuery will throw an error if "LESSONS_BY_OWNER" is currently not stored in cache
      const cachedData = tryCatch(
        () => proxy.readQuery<LessonsByOwnerQuery>({ query: LESSONS_BY_OWNER, variables }),
        always(null),
      )();

      if (cachedData?.lessonsByOwner) {
        const cachedItems = cachedData.lessonsByOwner.items || [];
        const filteredCachedItems = cachedItems?.filter(notNil);
        const updatedItems = callback(filteredCachedItems, result.data!);

        // Only update the cache if the callback returned a new array
        if (filteredCachedItems !== updatedItems) {
          proxy.writeQuery({
            query: LESSONS_BY_OWNER,
            variables,
            data: {
              ...cachedData,
              lessonsByOwner: {
                ...cachedData.lessonsByOwner,
                items: sort(byDateString, updatedItems),
              },
            },
          });
        }
      }
    }
  }), [variables]);
};
