import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import ConfirmForgotPasswordContainer from '../../features/Auth/ForgotPassword/ConfirmForgotPasswordContainer';
import ForgotPasswordContainer from '../../features/Auth/ForgotPassword/ForgotPasswordContainer';
import SignInContainer from '../../features/Auth/SignIn/SignInContainer';
import ConfirmSignUpContainer from '../../features/Auth/SignUp/ConfirmSignUpContainer';
import SignUpContainer from '../../features/Auth/SignUp/SignUpContainer';
import LessonCreateContainer from '../../features/Lessons/Form/LessonCreateContainer';
import LessonUpdateContainer from '../../features/Lessons/Form/LessonUpdateContainer';
import LessonsContainer from '../../features/Lessons/Table/LessonsContainer';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const SIGN_IN_ROUTE = '/signIn';
export const FORGOT_PASSWORD_ROUTE = '/forgotPassword';
export const FORGOT_PASSWORD_CONFIRM_ROUTE = '/forgotPassword/confirm/:email';
export const SIGN_UP_ROUTE = '/signUp';
export const SIGN_UP_CONFIRM_ROUTE = '/signUp/confirm/:email';
export const LESSONS_ROUTE = '/lessons';
export const LESSON_CREATE_ROUTE = '/lesson';
export const LESSON_UPDATE_ROUTE = '/lesson/:id';

const Routes = () => (
  <Switch>
    <PublicRoute restricted exact path={SIGN_IN_ROUTE}>
      <SignInContainer />
    </PublicRoute>
    <PublicRoute restricted exact path={FORGOT_PASSWORD_ROUTE}>
      <ForgotPasswordContainer />
    </PublicRoute>
    <PublicRoute restricted exact path={FORGOT_PASSWORD_CONFIRM_ROUTE}>
      <ConfirmForgotPasswordContainer />
    </PublicRoute>
    <PublicRoute restricted exact path={SIGN_UP_ROUTE}>
      <SignUpContainer />
    </PublicRoute>
    <PublicRoute restricted exact path={SIGN_UP_CONFIRM_ROUTE}>
      <ConfirmSignUpContainer />
    </PublicRoute>
    <PrivateRoute exact path={LESSONS_ROUTE}>
      <LessonsContainer />
    </PrivateRoute>
    <PrivateRoute exact path={LESSON_CREATE_ROUTE}>
      <LessonCreateContainer />
    </PrivateRoute>
    <PrivateRoute exact path={LESSON_UPDATE_ROUTE}>
      <LessonUpdateContainer />
    </PrivateRoute>
    <Redirect from="*" to={LESSONS_ROUTE} />
  </Switch>
);

export default Routes;
