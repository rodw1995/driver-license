import { ValidationOptions } from 'react-hook-form';

type LessonValidationRules = {
  date: ValidationOptions,
  duration: ValidationOptions,
  focusPoints: ValidationOptions,
  score: ValidationOptions,
  retrospective: ValidationOptions,
};

const lessonValidationRules: LessonValidationRules = {
  date: {
    required: 'Date is required',
    validate: (dateString) => (Date.parse(dateString) ? true : 'Invalid date time string'),
  },
  duration: {
    required: 'Duration is required',
    min: { value: 60, message: 'A lesson must last at least an hour' },
    max: { value: 120, message: 'A lesson may take up to 2 hours' },
  },
  focusPoints: {},
  score: {
    min: { value: 1, message: 'Score between 1 and 10' },
    max: { value: 10, message: 'Score between 1 and 10' },
  },
  retrospective: {},
};

export default lessonValidationRules;
