import {DEFAULT_SHOW_FILMS} from '../../constants/common';

type ShowMoreButtonProps = {
  showCount: number;
  onChangeShowCount: (count: number) => void;
}

function ShowMoreButton(props: ShowMoreButtonProps): JSX.Element {
  const {showCount, onChangeShowCount} = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => onChangeShowCount(showCount + DEFAULT_SHOW_FILMS)}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
