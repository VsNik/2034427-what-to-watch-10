import {render, screen} from '@testing-library/react';
import {makeFakeFilm} from '../../../utils/mocks';
import FilmDetails from './film-details';
import {formattingDuration} from '../../../utils/common';

const fakeFilm = makeFakeFilm();

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {
    const formatRuntime = formattingDuration(fakeFilm.runTime);

    render (
      <FilmDetails film={fakeFilm}/>
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();

    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(formatRuntime)).toBeInTheDocument();

    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();

    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
  });
});
