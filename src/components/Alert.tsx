import { Alert as MuiAlert } from '@material-ui/lab';
import { AlertProps } from '@material-ui/lab/Alert/Alert';
import React from 'react';

const Alert = (props: Partial<AlertProps> = {}) => (
  <MuiAlert
    elevation={6}
    variant="filled"
    {...props}
  />
);

export default Alert;
