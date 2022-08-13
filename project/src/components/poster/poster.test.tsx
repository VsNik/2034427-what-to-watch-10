import {render, screen} from '@testing-library/react';
import {Poster} from '../index';
import {makeFakeFilm} from '../../utils/mocks';

describe('Component Poster', () => {
  it('should render correctly', () => {
    const mockFilm = makeFakeFilm();
    const posterSrc = mockFilm.posterImage;
    const posterTitle = mockFilm.name;

    render(
      <Poster posterSrc={posterSrc} posterTitle={posterTitle}/>
    );

    expect(screen.getByTestId('poster-img')).toHaveAttribute('src', posterSrc);
    expect(screen.getByTestId('poster-img')).toHaveAttribute('alt', posterTitle);
  });
});
