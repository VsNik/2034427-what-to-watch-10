import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import CommentForm from './comment-form';
import {MOCK_ERROR, MOCK_ID} from '../../utils/mocks';

const mockStore = configureMockStore();

describe('Component: CommentForm', () => {
  it('should render correctly', async () => {
    const store = mockStore({
      COMMENTS: {
        comments: [],
        isSending: false,
        error: '',
      }
    });

    render(
      <Provider store={store}>
        <CommentForm filmId={MOCK_ID}/>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Post');

    await userEvent.type(screen.getByTestId('text-comment'), 'new-comment');
    expect(screen.getByDisplayValue('new-comment')).toBeInTheDocument();
  });

  it('should block form, if sending comment', async () => {
    const store = mockStore({
      COMMENTS: {
        comments: [],
        isSending: true,
        error: '',
      }
    });

    render(
      <Provider store={store}>
        <CommentForm filmId={MOCK_ID}/>
      </Provider>
    );

    expect(screen.getByTestId('text-comment')).toHaveProperty('disabled', true);
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });

  it('should show error', async () => {
    const store = mockStore({
      COMMENTS: {
        comments: [],
        isSending: false,
        error: MOCK_ERROR,
      }
    });

    render(
      <Provider store={store}>
        <CommentForm filmId={MOCK_ID}/>
      </Provider>
    );

    expect(screen.getByTestId('comment-error').textContent).toBe(MOCK_ERROR);
  });
});
