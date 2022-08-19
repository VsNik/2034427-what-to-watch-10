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
const fakeFilms = makeFakeFilms()
  .slice(0, MAX_COUNT_SIMILAR_FILMS);

describe('Component: SimilarFilms', () => {
  window.HTMLMediaElement.prototype.pause = jest.fn();

  it('should render correctly', () => {
    const store = mockStore({
      FILM: {similarFilms: fakeFilms},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarFilms/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('film-card').length).toBe(fakeFilms.length);
  });
});
