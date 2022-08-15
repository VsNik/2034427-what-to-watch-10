import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import GenreMenu from './genre-menu';
import {makeFakeFilms} from '../../utils/mocks';
import {selectGenres} from '../../store/films-slice/select';
import {DEFAULT_GENRE, MAX_COUNT_GENRES} from '../../constants/common';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: GenreMenu', () => {
  it('should render correctly', () => {
    const changeShowCount = jest.fn();
    const mockFilms = makeFakeFilms();
    const genres = selectGenres.resultFunc(mockFilms)
      .slice(0, MAX_COUNT_GENRES);

    const store = mockStore({
      FILMS: {films: mockFilms},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenreMenu changeShowCount={changeShowCount}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(DEFAULT_GENRE)).toBeInTheDocument();

    genres.map((genre) =>
      expect(screen.getByText(genre)).toBeInTheDocument()
    );
  });
});
