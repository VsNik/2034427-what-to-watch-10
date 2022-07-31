import {Middleware} from 'redux';
import browserHistory from '../../utils/browser-history';
import {Reducer} from '../../types/state';

export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === 'app/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
