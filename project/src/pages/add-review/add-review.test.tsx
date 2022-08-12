import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {AuthStatus} from '../../constants/common';
import {makeFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import AddReview from './add-review';
import {RouteName} from '../../constants/route-name';
import SignIn from '../sign-in/sign-in';

describe('Component: AddReview', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();

  it('should render correctly if user is authorized', () => {
    const mockFilm = makeFakeFilm();

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILM: {film: mockFilm, isLoaded: false},
      COMMENTS: {isSending: false},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should redirect to /login if user is unauthorized',() => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={RouteName.AddReview.path}
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

    expect(screen.getByText('Mock Main Page')).toBeInTheDocument();
  });
});
