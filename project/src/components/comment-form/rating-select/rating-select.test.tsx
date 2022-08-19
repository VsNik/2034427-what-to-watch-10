import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingSelect from './rating-select';
import {MAX_RATING} from '../../../constants/common';

const SELECT_RATING = 5;
const mockOnChangeRating = jest.fn();

describe('Component: RatingSelect', () => {
  it('should render correctly', async () => {
    render(
      <RatingSelect
        isSending={false}
        onChangeRating={mockOnChangeRating}
      />
    );

    const radioElements = screen.getAllByRole('radio');
    const labelElements = screen.getAllByTestId('label-star');
    expect(radioElements.length).toBe(MAX_RATING);
    expect(labelElements.length).toBe(MAX_RATING);

    await userEvent.click(labelElements[SELECT_RATING]);
    expect(radioElements[SELECT_RATING]).toBeChecked();
    expect(mockOnChangeRating).toBeCalled();
  });

  it('should disabled, if sending', () => {
    render(
      <RatingSelect
        isSending
        onChangeRating={mockOnChangeRating}
      />
    );

    const radioElements = screen.getAllByRole('radio');
    radioElements.forEach((radio) =>
      expect(radio).toHaveProperty('disabled', true));
  });
});
