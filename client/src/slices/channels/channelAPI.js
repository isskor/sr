import { api } from '../../api';

export const fetchChannels = () => api.get(`/channels`);
export const fetchChannel = (id) => api.get(`/channels/${id}`);
export const fetchChannelSchedule = (body) =>
  api.post(`/channels/schedule`, body);

export const fetchNextPrevChannel = (url) => {
  return api.get(`/channels/nextprev`, { params: { url } });
};
export const fetchChannelPrograms = (id) => api.get(`/channels/programs/${id}`);
