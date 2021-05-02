import { api } from '../../api';

export const userRegister = (body) => api.post(`/user/register`, body);

export const userLogin = (body) => api.post(`/user/login`, body);

// 'x-access-token': localStorage.getItem('token')

export const fetchUser = () =>
  api.get('user/get', {
    headers: {
      authorization: localStorage.getItem('token'),
    },
  });

export const addFavorite = (body) =>
  api.post('/user/favorite', body, {
    headers: { authorization: localStorage.getItem('token') },
  });
export const delFavorite = (data) =>
  api.delete('/user/favorite', {
    headers: { authorization: localStorage.getItem('token') },
    data: { data },
  });

export const fetchFavorites = async () =>
  await api.get('/user/favorite', {
    headers: { authorization: localStorage.getItem('token') },
  });

export const fetchSchedule = async () =>
  await api.get('/user/schedule', {
    headers: { authorization: localStorage.getItem('token') },
  });
