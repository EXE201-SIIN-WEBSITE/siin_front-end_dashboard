import axios, { AxiosInstance } from 'axios'

const url = 'http://localhost:8080/api/v1'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: url,
      timeout: 10000
    })
  }
}

export const http = new Http().instance
