import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import {RouteName} from '../../constants/route-name';
import PrivateRoute from './private-route';
import {AuthStatus} from '../../constants/common';

const MOCK_PRIVATE_ROUTE = '/private';

const mockStore = configureMockStore();
const history = createMemoryHistory();

beforeEach(() => {
  history.push(MOCK_PRIVATE_ROUTE);
});

const mockComponent = (
  <HistoryRouter history={history}>
    <Routes>
      <Route
        path={RouteName.SignIn}
        element={<h1>Public Route</h1>}
      />
      <Route
        path={MOCK_PRIVATE_ROUTE}
        element={
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        }
      />
    </Routes>
  </HistoryRouter>
);

describe('Component: PrivateRoute', () => {
  it('should render component for public route, when user is unauthorized', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        {mockComponent}
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user is authorized', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth}
    });

    render(
      <Provider store={store}>
        {mockComponent}
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
