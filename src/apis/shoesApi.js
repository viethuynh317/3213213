import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5959/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getShoes = ({ search }) => {
  const url = "/shoes";
  return axiosClient.get(url, {
    params: {
      search,
      page: 1,
      perPage: 10
    }
  });
};
