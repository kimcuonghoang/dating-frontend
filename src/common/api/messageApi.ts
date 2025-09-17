import api from "./index";

export const getMessage = (matchId: string) => {
  const res = api.get(`/messages/${matchId}`);
  return res;
};

export const sendMessage = (matchId: string, content: string) => {
  const res = api.post(`/messages/${matchId}`, { content });
  return res;
};
