import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {RouteName} from '../../constants/route-name';

type LogoProps = {
  className?: string;
}

function Logo({className}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link
        to={RouteName.Main}
        className={classNames('logo__link', className)}
        data-testid="logo"
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
