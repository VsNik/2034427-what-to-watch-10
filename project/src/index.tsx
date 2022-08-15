import React from 'react';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from 'react-toastify';
import {App, ScrollTop} from './components';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchFilmsAction, fetchPromoFilmAction} from './store/api-actions';
import {injectStore} from './services/api';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './utils/browser-history';
import 'react-toastify/dist/ReactToastify.css';

injectStore(store);

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollTop/>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
