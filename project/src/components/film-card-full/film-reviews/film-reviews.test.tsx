import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {makeFakeComments} from '../../../utils/mocks';
import FilmReviews from './film-reviews';

const mockStore = configureMockStore();
const fakeComments = makeFakeComments();

describe('Component: FilmReviews',() => {
  it('should render correctly',() => {
    const store = mockStore({
      COMMENTS: {comments: fakeComments}
    });

    render(
      <Provider store={store}>
        <FilmReviews/>
      </Provider>
    );

    expect(screen.getAllByTestId('comment').length).toBe(fakeComments.length);
  });
});
