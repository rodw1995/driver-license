import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import Page from '../../../components/Page';
import { Lesson } from '../lessonType';

type LessonsPageProps = {
  state: 'loading' | 'loaded' | 'error',
  lessons: Array<Required<Lesson>>,
  onRefetch: () => void,
  onNavigateAdd: () => void,
  onNavigateEdit: (id: string) => void,
  onDelete: (id: string) => void,
}

const LessonsPage = ({ state, lessons, onRefetch, onNavigateAdd, onNavigateEdit, onDelete }: LessonsPageProps) => (
  <Page
    title="Lessons"
    toolbar={(
      <Button size="small" variant="outlined" color="inherit" onClick={onNavigateAdd}>
        ADD
      </Button>
      )}
  >
    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={3}>
      {state === 'error' && (
        <>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="error">
              Error while loading lessons...
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="secondary" onClick={onRefetch}>Reload</Button>
          </Grid>
        </>
      )}
      {state === 'loading' && (
        <>
          <Grid item xs={12} sm={6}>
            <CircularProgress color="secondary" />
          </Grid>
        </>
      )}
      {state === 'loaded' && (
      <TableContainer>
        <Table aria-label="Lessons">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Focus points</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Retrospective</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{new Date(lesson.date).toLocaleString()}</TableCell>
                <TableCell>{lesson.duration}</TableCell>
                <TableCell>
                  <ul>
                    {lesson.focusPoints?.map((x, index) => (
                      <li key={index}>{x}</li>
                    )) || '-'}
                  </ul>
                </TableCell>
                <TableCell>{lesson.score || '-'}</TableCell>
                <TableCell>{lesson.retrospective || '-'}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => onNavigateEdit(lesson.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(lesson.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
    </Grid>
  </Page>
);

export default LessonsPage;
