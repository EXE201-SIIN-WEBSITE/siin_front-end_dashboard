import axios, { AxiosInstance } from 'axios'

const url = 'http://172.188.64.221:8080/api/v1'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: url,
      timeout: 1000
      // headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}

export const http = new Http().instance
