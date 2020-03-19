import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import React from 'react';

export type TextFieldProps = MuiTextFieldProps;

const TextField = (props: TextFieldProps = {}) => (
  <MuiTextField
    fullWidth
    variant="outlined"
    margin="normal"
    {...props}
  />
);

export default TextField;
