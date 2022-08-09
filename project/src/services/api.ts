import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {Store} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {BACKEND_URL, REQUEST_TIMEOUT, ErrorMessage} from '../constants/common';
import {getToken} from './token';
import {redirectToRoute} from '../store/actions';
import {RouteName} from '../constants/route-name';

let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};

enum ErrorCode {
  NotFound = 404,
  ServerError = 500,
}

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
      if (error.response && error.response.status === ErrorCode.NotFound) {
        store.dispatch(redirectToRoute(RouteName.NotFound));
      }

      if (error.response && error.response.status >= ErrorCode.ServerError) {
        toast.error(ErrorMessage.ServerError);
      }

      throw error;
    });

  return api;
};
