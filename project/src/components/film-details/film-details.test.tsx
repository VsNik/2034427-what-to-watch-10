import {render, screen} from '@testing-library/react';
import {makeFakeFilm} from '../../utils/mocks';
import FilmDetails from './film-details';
import {formattingDuration} from '../../utils/common';

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {
    const mockFilm = makeFakeFilm();
    const formatRuntime = formattingDuration(mockFilm.runTime);

    render (
      <FilmDetails film={mockFilm}/>
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(formatRuntime)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });
});
