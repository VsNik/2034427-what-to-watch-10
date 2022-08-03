import {Link, Navigate} from 'react-router-dom';
import {RouteName} from '../../constants/route-name';
import {getFilmUrl} from '../../utils/route';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectFilm} from '../../store/film-slice/select';

function Player(): JSX.Element {
  const film = useAppSelector(selectFilm);

  if (!film) {
    return <Navigate to={RouteName.NotFound}/>;
  }

  const {id, previewImage} = film;

  return (
    <div className="player">
      <video src="#" className="player__video" poster={previewImage}/>
      <Link
        to={getFilmUrl(id)}
        className="player__exit"
      >
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"/>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"/>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
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
