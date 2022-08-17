import {useEffect, useRef, useState} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {getFilmUrl} from '../../utils/route';
import {useAppSelector} from '../../hooks/use-app-selector';
import {Video, VideoControl, VideoProgress} from '../../components';
import {formattingLastTime} from '../../utils/common';
import {selectPlayFilm, selectPlayType} from '../../store/player-slice/select';
import {PlayType} from '../../constants/common';
import './player.css';
import {RouteName} from '../../constants/route-name';

enum ProgressPlay {
  Start = 0,
  End = 100,
}

function Player(): JSX.Element {
  const params = useParams();
  const film = useAppSelector(selectPlayFilm);
  const playType = useAppSelector(selectPlayType);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  const handleInitVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = ProgressPlay.Start;
      handleTogglePlay();
    }
  };

  const handleToggleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current?.currentTime / videoRef.current?.duration) * ProgressPlay.End;
      setProgress(currentProgress);
      setLastTime(videoRef.current.duration - videoRef.current.currentTime);
    }
  };

  const handleVideoProgress = (value: string) => {
    const manualChange = Number(value);
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
      <Video
        videoRef={videoRef}
        src={videoLink}
        poster={previewImage}
        onLoadedMetadata={handleInitVideo}
        onTimeUpdate={handleTimeUpdate}
        onEndPlay={handleEndPlay}
      />

      <Link
        onClick={() => setIsPlaying(false)}
        to={playType === PlayType.Promo ? RouteName.Main : getFilmUrl(id)}
        className="player__exit"
        data-testid="player-exit"
      >
        Exit
      </Link>

      <div className="player__controls">
        <VideoProgress
          progress={progress}
          lastTile={formatLastTime}
          onVideoProgress={handleVideoProgress}
        />

        <VideoControl
          title={name}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>
    </div>
  );
}

export default Player;
