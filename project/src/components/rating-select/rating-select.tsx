import React from 'react';

const RATING_LENGTH = 10;

type RatingSelectProps = {
  isSending: boolean;
  onChangeRating: (value: string) => void;
}

function RatingSelect({isSending, onChangeRating}: RatingSelectProps): JSX.Element {

  return (
    <div className="rating">
      <div className="rating__stars">
        {
          Array.from({length: RATING_LENGTH}, (_, index) => (
            <React.Fragment key={`rating-${index}`}>
              <input
                value={RATING_LENGTH - index}
                className="rating__input"
                id={`star-${RATING_LENGTH - index}`}
                type="radio"
                name="rating"
                onChange={(evt) => onChangeRating(evt.target.value)}
                defaultChecked={RATING_LENGTH - index === 8}
                disabled={isSending}
              />
              <label
                className="rating__label"
                htmlFor={`star-${RATING_LENGTH - index}`}
              >
                Rating {RATING_LENGTH - index}
              </label>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  );
}

export default RatingSelect;
