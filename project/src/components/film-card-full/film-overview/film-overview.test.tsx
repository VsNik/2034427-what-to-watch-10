import {render, screen} from '@testing-library/react';
import FilmOverview from './film-overview';
import {makeFakeFilm} from '../../../utils/mocks';
import {getRatingName} from '../../../utils/common';

describe('Component: FilmOverview', () => {
  it('should render correctly', () => {
    const mockFilm = makeFakeFilm();
    const rating = mockFilm.rating.toFixed(1);
    const ratingName = getRatingName(mockFilm.rating);
    const starringString = mockFilm.starring.map((item) => item).join(', ');

    render (
      <FilmOverview film={mockFilm} />
    );

    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(ratingName)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${starringString}`)).toBeInTheDocument();
  });
});
