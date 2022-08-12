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

describe('Component: SignIn', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();

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
});
