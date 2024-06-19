import axios, { AxiosInstance } from 'axios'

const url = 'https://exe201-backend.click/api/v1/'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: url,
      timeout: 5000
      // headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}

export const http = new Http().instance
