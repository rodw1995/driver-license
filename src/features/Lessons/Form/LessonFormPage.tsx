import { Button, Link, makeStyles } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { otherwise, pipe } from 'ramda';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { LESSONS_ROUTE } from '../../../app/consumers/routes';
import Page from '../../../components/Page';
import TextField from '../../../components/TextField';
import useCanSubmit from '../../../hooks/useCanSubmit';
import useFormStyles from '../../../styles/useFormStyles';
import andThen from '../../../utils/andThen';
import { LessonFormData } from '../lessonType';
import lessonValidationRules from '../lessonValidation';

type LessonFormPageProps = {
  data?: Partial<LessonFormData>,
  action: (formState: LessonFormData) => Promise<any>,
};

const useStyles = makeStyles((theme) => ({
  backLink: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
}));

const LessonFormPage = ({ data, action }: LessonFormPageProps) => {
  const formClasses = useFormStyles();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const isCreate = !data;

  const form = useForm<LessonFormData>();
  const canSubmit = useCanSubmit(form);
  const { register, handleSubmit, errors } = form;

  const onSubmit = useMemo(() => handleSubmit(pipe(
    action,
    andThen(() => {
      enqueueSnackbar(`Lesson is ${isCreate ? 'create' : 'updated'}!`, { variant: 'success' });

      if (isCreate) {
        history.push(LESSONS_ROUTE);
      }
    }),
    otherwise(() => {
      enqueueSnackbar('Couldn\'t save your data', { variant: 'error' });
    }),
  )), [handleSubmit, action, enqueueSnackbar, isCreate, history]);

  return (
    <Page
      title={isCreate ? 'Add Lesson' : 'Edit Lesson'}
      preToolbar={(
        <Link component={RouterLink} to="/lessons" variant="body2" className={classes.backLink}>
          <ChevronLeft />
          Lessons
        </Link>
      )}
    >
      <form className={formClasses.form} onSubmit={onSubmit}>
        <TextField
          inputRef={register(lessonValidationRules.date)}
          defaultValue={data?.date}
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          label="Date"
          name="date"
          required
          error={!!errors.date}
          helperText={errors?.date?.message}
        />
        <TextField
          inputRef={register(lessonValidationRules.duration)}
          defaultValue={data?.duration}
          type="number"
          inputProps={{
            min: 60,
            max: 120,
          }}
          label="Duration (in minutes)"
          name="duration"
          required
          error={!!errors.duration}
          helperText={errors?.duration?.message}
        />
        <TextField
          inputRef={register(lessonValidationRules.focusPoints)}
          defaultValue={data?.focusPoints}
          label="Focus points (comma separated)"
          name="focusPoints"
          error={!!errors.focusPoints}
          helperText={errors?.focusPoints?.message}
        />
        <TextField
          inputRef={register(lessonValidationRules.score)}
          defaultValue={data?.score}
          type="number"
          inputProps={{
            min: 1,
            max: 10,
          }}
          label="Score"
          name="score"
          error={!!errors.score}
          helperText={errors?.score?.message}
        />
        <TextField
          inputRef={register(lessonValidationRules.retrospective)}
          defaultValue={data?.retrospective}
          multiline
          rows="4"
          label="Retrospective"
          name="retrospective"
          error={!!errors.retrospective}
          helperText={errors?.retrospective?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={formClasses.submit}
          disabled={!canSubmit}
        >
          {data ? 'Save' : 'Add'}
        </Button>
      </form>
    </Page>
  );
};

export default LessonFormPage;
