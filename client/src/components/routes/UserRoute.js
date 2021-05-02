import React, { useEffect } from 'react';
import { useHistory, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectUserStatus } from '../../slices/user/userSlice';
import { api } from '../../api';

const UserRoute = ({ ...rest }) => {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const history = useHistory();

  return user || localStorage.getItem('token') ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: '/', from: history.location }} />
  );
};

export default UserRoute;
