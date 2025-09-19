import api from "./index";

export const getMessage = async (matchId: string) => {
  const res = await api.get(`/messages/${matchId}`);
  return res.data.data;
};

export const sendMessage = async (matchId: string, content: string) => {
  const res = await api.post(`/messages/${matchId}`, { content });
  return res;
};
