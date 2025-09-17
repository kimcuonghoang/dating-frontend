import api from "./index";

export const getMatches = async (userId: string) => {
  const res = await api.get(`/matches/${userId}`);
  return res.data.data;
};
