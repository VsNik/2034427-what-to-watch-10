import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {getFilmUrl} from '../../utils/route';
import {useAppSelector} from '../../hooks/use-app-selector';
import {Spinner} from '../../components';
import {formattingLastTime} from '../../utils/common';
import {selectPlayFilm, selectPlayType} from '../../store/player-slice/select';
import {PlayType} from '../../constants/common';
import './player.css';

enum ProgressPlay {
  Start = 0,
  End = 100,
}

function Player(): JSX.Element {
  const params = useParams();
  const film = useAppSelector(selectPlayFilm);
  const playType = useAppSelector(selectPlayType);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(ProgressPlay.Start);
  const [lastTime, setLastTime] = useState<number>(ProgressPlay.Start);
  const formatLastTime = formattingLastTime(lastTime);

  useEffect(() => {
    isPlaying
      ? videoRef.current?.play()
      : videoRef.current?.pause();
  }, [isPlaying]);

  if (!film || playType === PlayType.Unknown) {
    const filmId = params.id as string;
    return <Navigate to={getFilmUrl(filmId)}/>;
  }

  const {id, name, previewImage, videoLink} = film;

  const initVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = ProgressPlay.Start;
      togglePlay();
    }
  };

  const toggleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current?.currentTime / videoRef.current?.duration) * ProgressPlay.End;
      setProgress(currentProgress);
      setLastTime(videoRef.current.duration - videoRef.current.currentTime);
    }
  };

  const handleVideoProgress = (evt: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(evt.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current?.duration / ProgressPlay.End) * manualChange;
      setProgress(manualChange);
    }
  };

  const handleEndPlay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = ProgressPlay.Start;
      setIsPlaying(false);
    }
  };

  return (
    <div className="player">
      <video
        className="player__video"
        ref={videoRef}
        src={videoLink}
        poster={previewImage}
        onLoadedMetadata={initVideo}
        onTimeUpdate={handleTimeUpdate}
        onSeeking={() => setIsLoading(true)}
        onSeeked={() => setIsLoading(false)}
        onEnded={handleEndPlay}
        data-testid="player-video"
      />
      <Link
        onClick={() => setIsPlaying(false)}
        to={getFilmUrl(id)}
        className="player__exit"
        data-testid="player-exit"
      >
        Exit
      </Link>

      {
        isLoading &&
        <span className="player-preloader">
          <Spinner/>
        </span>
      }

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <input
              className="player__progress"
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(evt) => handleVideoProgress(evt)}
            />
            <progress
              className="player__progress"
              value={progress}
              max="100"
              data-testid="player-progress"
            />
          </div>
          <div className="player__time-value" data-testid="player-time">- {formatLastTime}</div>
        </div>

        <div className="player__controls-row">
          {
            isPlaying
              ? (
                <button
                  type="button"
                  className="player__play"
                  onClick={() => togglePlay()}
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
                  onClick={() => togglePlay()}
                  data-testid="player-play"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
              )
          }
          <div className="player__name">{name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={toggleFullscreen}
            data-testid="player-fullscreen"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
