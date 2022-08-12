import {render, screen} from '@testing-library/react';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    const mockChangeShowCount = jest.fn();
    const mockShowCount = 8;

    render(
      <ShowMoreButton
        showCount={mockShowCount}
        changeShowCount={mockChangeShowCount}
      />
    );

    expect(screen.getByRole('button').textContent).toBe('Show more');
  });
});
