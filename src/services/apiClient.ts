import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://myfakeapi.com/api'
})

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async () => {
    return axiosInstance.get<T[]>(this.endpoint).then(res => res.data);
  }

  post  = async (data: T)  => {
    return axiosInstance.post<T>(this.endpoint, data).then(res => res.data);
  }

}

export default APIClient