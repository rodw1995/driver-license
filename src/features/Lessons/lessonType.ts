import { isEmpty, pick, reject, trim } from 'ramda';
import toDatetimeLocalFormat from '../../utils/toDatetimeLocalFormat';

export type Lesson = {
  id?: string,
  owner?: string,
  date?: string,
  duration?: number,
  focusPoints?: Array<string> | null,
  score?: number | null,
  retrospective?: string | null,
};

export type LessonFormData = {
  date: string,
  duration: string,
  focusPoints: string,
  score: string,
  retrospective: string,
};

export const toLesson = pick([
  'id', 'owner', 'date', 'duration', 'focusPoints', 'score', 'retrospective',
]);

export const formDataToLesson = ({
  date, duration, focusPoints, score, retrospective,
}: LessonFormData): Lesson & Required<Pick<Lesson, 'date' | 'duration'>> => ({
  date: new Date(date).toISOString(),
  duration: parseInt(duration, 10) || 60,
  focusPoints: reject(isEmpty)(focusPoints.split(',').map(trim)),
  score: parseInt(score, 10) || undefined,
  retrospective: retrospective || undefined,
});

export const lessonToFormData = ({
  date, duration, focusPoints, score, retrospective,
}: Required<Lesson>): Partial<LessonFormData> => ({
  date: toDatetimeLocalFormat(new Date(date)),
  duration: duration?.toString(),
  focusPoints: focusPoints?.join(', '),
  score: score?.toString(),
  retrospective: retrospective || undefined,
});
