import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import PromoFilm from './promo-film';
import {AuthStatus} from '../../constants/common';

describe('Component: PromoFilm', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();

  it('should render correctly', () => {
    const mockFilm = makeFakeFilm();

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {films: []},
      PROMO: {promoFilm: mockFilm, isLoaded: false},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PromoFilm/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('bg-promo-img')).toHaveAttribute('src', mockFilm.backgroundImage);
    expect(screen.getByTestId('bg-promo-img')).toHaveAttribute('alt', mockFilm.name);
  });
});
