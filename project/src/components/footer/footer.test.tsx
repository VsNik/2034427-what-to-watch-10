import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import Footer from './footer';
import HistoryRouter from '../history-route/history-route';

describe('Component Footer', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {
    const currentYar = new Date().getFullYear();
    render(
      <HistoryRouter history={history}>
        <Footer/>
      </HistoryRouter>
    );

    expect(screen.getByText(new RegExp(`${currentYar}`))).toBeInTheDocument();
    expect(screen.getByText(/What to watch Ltd/i)).toBeInTheDocument();
  });
});
