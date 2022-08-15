import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import FilmMenu from './film-menu';

const history = createMemoryHistory();

const mockComponent = (
  <HistoryRouter history={history}>
    <FilmMenu/>
  </HistoryRouter>
);

describe('Component: FilmMenu', () => {
  it('should render correctly', async () => {
    render(mockComponent);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});

