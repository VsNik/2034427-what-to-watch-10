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
const mockFilm = makeFakeFilm();
describe('Component: AddReview', () => {
  it('should render correctly', () => {
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
    expect(screen.getByTestId('add-review-img')).toHaveAttribute('src', mockFilm.backgroundImage);
    expect(screen.getByTestId('add-review-img')).toHaveAttribute('alt', mockFilm.name);
  });
});
