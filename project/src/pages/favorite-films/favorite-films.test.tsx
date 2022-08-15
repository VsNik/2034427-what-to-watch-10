import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {AuthStatus} from '../../constants/common';
import HistoryRouter from '../../components/history-route/history-route';
import FavoriteFilms from './favorite-films';
import {makeFakeFilms} from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const mockFilms = makeFakeFilms();

window.HTMLMediaElement.prototype.pause = jest.fn();

describe('Component: FavoriteFilms', () => {
  it('should render correctly', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FAVORITE: {favorites: mockFilms, isLoaded: false}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteFilms/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();

    const cards = screen.getAllByTestId('film-card');
    expect(cards.length).toBe(mockFilms.length);
  });
});
