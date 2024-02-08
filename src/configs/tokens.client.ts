import axios from "axios";

const tokensClient = axios.create({
  baseURL:
    (process.env.NEXT_PUBLIC_URL || "http://109.123.235.30:5087") + "/api",
});

tokensClient.interceptors.response.use(({ data }) => {
  return data;
});

export default tokensClient;
