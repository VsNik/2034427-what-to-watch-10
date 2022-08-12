import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import SimilarFilms from './similar-films';

describe('Component: SimilarFilms', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const store = mockStore({
      FILM: {similarFilms: []},
    });

    render(
      <Provider store={store}>
        <SimilarFilms/>
      </Provider>
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });
});
