import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../constants/common';
import {getToken} from './token';
import {store} from '../store';
import {redirectToRoute} from '../store/actions';
import {RouteName} from '../constants/route-name';

const NOT_FOUND = 404;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === NOT_FOUND) {
        store.dispatch(redirectToRoute(RouteName.NotFound));
      }

      throw error;
    });

  return api;
};
