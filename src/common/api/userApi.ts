import api from "./index";

export const getAllUser = async () => {
  const res = await api.get("/users");
  return res.data.data;
};
export const getProfileUser = async (userId: string) => {
  const res = await api.get(`/users/${userId}`);
  return res;
};

export const updateProfileUser = async (userId: string, data: any) => {
  const res = await api.patch(`/users/${userId}`, data);
  return res;
};
