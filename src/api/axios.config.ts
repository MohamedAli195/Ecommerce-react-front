import axios from "axios";

export const axionsInstance = axios.create({
    baseURL: 'http://localhost:1337',
  });