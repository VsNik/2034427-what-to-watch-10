import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {AuthStatus} from '../../constants/common';
import {makeFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import AddReview from './add-review';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

const mockAddReview = (
  <HistoryRouter history={history}>
    <AddReview/>
  </HistoryRouter>
);

describe('Component: AddReview', () => {
  it('should render correctly', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILM: {film: fakeFilm, isLoaded: false},
      COMMENTS: {isSending: false},
    });

    render(
      <Provider store={store}>
        {mockAddReview}
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-img')).toHaveAttribute('src', fakeFilm.backgroundImage);
    expect(screen.getByTestId('add-review-img')).toHaveAttribute('alt', fakeFilm.name);
  });

  it('should error screen, if load error', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILM: {film: fakeFilm, isLoaded: false, isLoadError: true},
      COMMENTS: {isSending: false},
    });

    render(
      <Provider store={store}>
        {mockAddReview}
      </Provider>
    );

    expect(screen.getByText(/server is not available/i)).toBeInTheDocument();
  });
});
