import axios from 'axios';

import { api } from '../config.json';

const { ip, port } = api;

const address = `${ip}:${port}`;

const callApi = async (method, endPoint, body = null) => {
  try {
    const response = await axios[method](`${address}${endPoint}`, body);
    return response.data;
  } catch (error) {
    console.error('callApi error: ', error);
  }
};

export default callApi;
