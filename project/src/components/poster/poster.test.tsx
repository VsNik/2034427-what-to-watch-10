import {render, screen} from '@testing-library/react';
import {Poster} from '../index';

describe('Component Poster', () => {
  it('should render correctly', () => {
    const posterSrc = 'poster-image';
    const posterTitle = 'poster-title';

    render(
      <Poster posterSrc={posterSrc} posterTitle={posterTitle}/>
    );

    expect(screen.getByTestId('poster-img')).toHaveAttribute('src', posterSrc);
    expect(screen.getByTestId('poster-img')).toHaveAttribute('alt', posterTitle);
  });
});
