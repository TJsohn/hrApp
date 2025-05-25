import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const instance = axios.create({
  baseURL,
});

const useAxios = () => {
  const get = (url) => instance.get(url);
  const post = (url, data) => instance.post(url, data);
  const patch = (url, data) => instance.patch(url, data);
  return { get, post, patch };
};

export default useAxios;
