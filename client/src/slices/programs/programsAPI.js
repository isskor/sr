import { api } from '../../api';

export const fetchPrograms = (page = 1, categoryId = null) =>
  api.get(`/programs`, { params: { page, categoryId } });

export const fetchProgram = (id) => api.get(`/program/${id}`);

// export const fetchChannelSchedule = (body) =>
//   axios.post(`${API}/channels/schedule`, body);

export const fetchNextPrevPrograms = (url) => {
  return api.get(`/programs/nextprev`, { params: { url } });
};

export const fetchProgramEpisodes = (q) => {
  const { id, start, end } = q;
  return api.get(`/program/episodes/${id}`, {
    params: { start, end },
  });
};

export const fetchProgramEpisode = (id) => api.get('/episode/' + id);

export const fetchMostRecent = (id) => api.get('/recent');
