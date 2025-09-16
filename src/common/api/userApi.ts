import api from "./index";

export const getProfileUser = (userId: string) => {
  const res = api.get(`/users/${userId}`);
  return res;
};

export const updateProfileUser = (userId: string) => {
  const res = api.patch(`/users/${userId}`);
  return res;
};
