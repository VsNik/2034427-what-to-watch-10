import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import SimilarFilms from './similar-films';
import {makeFakeFilms} from '../../utils/mocks';
import {MAX_COUNT_SIMILAR_FILMS} from '../../constants/common';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SimilarFilms', () => {
  it('should render correctly', () => {
    const mockFilms = makeFakeFilms()
      .slice(0, MAX_COUNT_SIMILAR_FILMS);

    const store = mockStore({
      FILM: {similarFilms: mockFilms},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarFilms/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('film-card').length).toBe(mockFilms.length);
  });
});
