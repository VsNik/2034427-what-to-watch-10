type VideoControlProps = {
  title: string,
  isPlaying: boolean,
  onTogglePlay: () => void,
  onToggleFullscreen: () => void,
}

function VideoControl(props: VideoControlProps): JSX.Element {
  const {title, isPlaying, onTogglePlay, onToggleFullscreen} = props;

  return (
    <div className="player__controls-row">
      {
        isPlaying
          ? (
            <button
              type="button"
              className="player__play"
              onClick={onTogglePlay}
              data-testid="player-pause"
            >
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"/>
              </svg>
              <span>Pause</span>
            </button>
          )
          : (
            <button
              type="button"
              className="player__play"
              onClick={onTogglePlay}
              data-testid="player-play"
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
          )
      }
      <div className="player__name" data-testid="player-title">{title}</div>

      <button
        type="button"
        className="player__full-screen"
        onClick={onToggleFullscreen}
        data-testid="player-fullscreen"
      >
        <svg viewBox="0 0 27 27" width="27" height="27">
          <use xlinkHref="#full-screen"/>
        </svg>
        <span>Full screen</span>
      </button>
    </div>
  );
}

export default VideoControl;
