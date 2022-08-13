import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import Footer from './footer';
import HistoryRouter from '../history-route/history-route';

describe('Component Footer', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer/>
      </HistoryRouter>
    );

    expect(screen.getByText(/What to watch Ltd/i)).toBeInTheDocument();
  });
});
