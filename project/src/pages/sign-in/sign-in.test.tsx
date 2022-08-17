import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import SignIn from './sign-in';
import {AuthStatus} from '../../constants/common';
import {Route, Routes} from 'react-router-dom';
import {RouteName} from '../../constants/route-name';
import {MOCK_ERROR} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SignIn', () => {
  it('should render correctly if user is unauthorized', async () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Sign In');

    await userEvent.type(screen.getByTestId('user-email'), 'email');
    await userEvent.type(screen.getByTestId('user-password'), 'password');

    expect(screen.getByDisplayValue('email')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });

  it('should redirect to /main if user is authorized', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={RouteName.SignIn}
              element={<SignIn/>}
            />
            <Route
              path={RouteName.Main}
              element={<h1>Mock Main Page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();
  });

  it('should show error, if incorrect auth data', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth, error: MOCK_ERROR},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('auth-error').textContent).toBe(MOCK_ERROR);
  });

  it('should disabled form, if sending auth data', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth, isSending: true},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-email')).toHaveProperty('disabled', true);
    expect(screen.getByTestId('user-password')).toHaveProperty('disabled', true);
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });
});
