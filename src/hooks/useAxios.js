import axios from "axios";

const useAxios = () => {
  const get = (url) => axios.get(url);
  const post = (url, data) => axios.post(url, data);
  const patch = (url, data) => axios.patch(url, data);
  return { get, post, patch };
};

export default useAxios;
