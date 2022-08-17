import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMoreButton from './show-more-button';
import {DEFAULT_SHOW_FILMS} from '../../constants/common';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', async () => {
    const mockChangeShowCount = jest.fn();

    render(
      <ShowMoreButton
        showCount={DEFAULT_SHOW_FILMS}
        onChangeShowCount={mockChangeShowCount}
      />
    );

    expect(screen.getByRole('button').textContent).toBe('Show more');
    await userEvent.click(screen.getByRole('button'));
    expect(mockChangeShowCount).toBeCalled();
  });
});
