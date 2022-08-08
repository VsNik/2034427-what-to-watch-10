import React from 'react';

export const MAX_RATING = 10;

type RatingSelectProps = {
  isSending: boolean;
  onChangeRating: (value: string) => void;
}

function RatingSelect({isSending, onChangeRating}: RatingSelectProps): JSX.Element {

  return (
    <div className="rating">
      <div className="rating__stars">
        {
          Array.from({length: MAX_RATING}, (_, index) => (
            <React.Fragment key={`rating-${index}`}>
              <input
                value={MAX_RATING - index}
                className="rating__input"
                id={`star-${MAX_RATING - index}`}
                type="radio"
                name="rating"
                onChange={(evt) => onChangeRating(evt.target.value)}
                disabled={isSending}
              />
              <label
                className="rating__label"
                htmlFor={`star-${MAX_RATING - index}`}
              >
                Rating {MAX_RATING - index}
              </label>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  );
}

export default RatingSelect;
