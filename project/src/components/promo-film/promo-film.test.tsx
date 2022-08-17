import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import PromoFilm from './promo-film';
import {AuthStatus} from '../../constants/common';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

describe('Component: PromoFilm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {films: []},
      PROMO: {promoFilm: fakeFilm, isLoaded: false},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PromoFilm/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('bg-promo-img')).toHaveAttribute('src', fakeFilm.backgroundImage);
    expect(screen.getByTestId('bg-promo-img')).toHaveAttribute('alt', fakeFilm.name);
  });
});
