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
const fakeFilms = makeFakeFilms();

describe('Component: GenreMenu', () => {
  it('should render correctly', () => {
    const mockOnChangeShowCount = jest.fn();
    const fakeGenres = selectGenres.resultFunc(fakeFilms)
      .slice(0, MAX_COUNT_GENRES);

    const store = mockStore({
      FILMS: {films: fakeFilms},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenreMenu onChangeShowCount={mockOnChangeShowCount}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(DEFAULT_GENRE)).toBeInTheDocument();

    fakeGenres.map((genre) =>
      expect(screen.getByText(genre)).toBeInTheDocument()
    );
  });
});
