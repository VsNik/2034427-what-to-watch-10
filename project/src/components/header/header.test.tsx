import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {AuthStatus} from '../../constants/common';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import {Route, Routes} from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly if user is unauthorized', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should redirect to /login url when user clicked to Sign in', async () => {
    history.push('/');
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="/"
              element={<Header/>}
            />
            <Route
              path="/login"
              element={<h1>This is Log in page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is Log in page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText(/This is Log in page/i)).toBeInTheDocument();
  });

  it('should render correctly if user is authorized',() => {
    history.push('/');
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('avatar-img')).toHaveAttribute('alt', 'User avatar');
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
