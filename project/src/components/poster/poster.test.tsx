import {render, screen} from '@testing-library/react';
import {Poster} from '../index';
import {makeFakeFilm} from '../../utils/mocks';

const fakeFilm = makeFakeFilm();

describe('Component Poster', () => {
  it('should render correctly', () => {
    const posterSrc = fakeFilm.posterImage;
    const posterTitle = fakeFilm.name;

    render(
      <Poster
        posterSrc={posterSrc}
        posterTitle={posterTitle}
      />
    );

    expect(screen.getByTestId('poster-img')).toHaveAttribute('src', posterSrc);
    expect(screen.getByTestId('poster-img')).toHaveAttribute('alt', posterTitle);
  });
});
