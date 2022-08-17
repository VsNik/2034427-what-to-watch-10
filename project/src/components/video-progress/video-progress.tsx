type VideoProgressProps = {
  progress: number,
  lastTile: string,
  onVideoProgress: (value: string) => void;
}

function VideoProgress(props: VideoProgressProps): JSX.Element {
  const {progress, lastTile, onVideoProgress} = props;

  return (
    <div className="player__controls-row">
      <div className="player__time">
        <input
          className="player__progress"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(evt) => onVideoProgress(evt.target.value)}
          data-testid="player-input"
        />
        <progress
          className="player__progress"
          value={progress}
          max="100"
          data-testid="player-progress"
        />
      </div>
      <div className="player__time-value" data-testid="player-time">- {lastTile}</div>
    </div>
  );
}

export default VideoProgress;
