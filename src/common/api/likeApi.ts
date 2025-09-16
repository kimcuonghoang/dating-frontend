import api from "./index";

export const likeUser = (id: string) => {
  const res = api.post(`/likes/users/${id}`);
  return res;
};
