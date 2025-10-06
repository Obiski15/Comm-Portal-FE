import axios, { RawAxiosRequestHeaders } from "axios"

export const axiosInstance = (
  clientUrl: string,
  headers?: RawAxiosRequestHeaders
) => {
  return axios.create({
    // timeout: 30000,
    baseURL: `/api/v1/${clientUrl}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    withCredentials: true,
  })
}
