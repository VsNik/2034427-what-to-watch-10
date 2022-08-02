import {FormEvent, PropsWithChildren} from 'react';
import {Link, useMatch} from 'react-router-dom';
import classNames from 'classnames';
import {RouteName} from '../../constants/route-name';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {AuthStatus} from '../../constants/auth-status';
import {logoutAction} from '../../store/api-actions';
import {selectAuthStatus} from '../../store/auth-slice/select';

type HeaderProps = PropsWithChildren<{
  className?: string;
}>

function Header({className, children}: HeaderProps): JSX.Element {
  const isLoginPath = useMatch(RouteName.SignIn);
  const authStatus = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();

  const handleLogout = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className={classNames('page-header', className)}>
      <div className="logo">
        <Link to={RouteName.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}

      {
        !isLoginPath &&
        <ul className="user-block">
          {
            authStatus === AuthStatus.Auth
              ? (
                <>
                  <li className="user-block__item">
                    <Link
                      to={RouteName.MyList}
                      className="user-block__avatar"
                    >
                      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                    </Link>
                  </li>
                  <li className="user-block__item">
                    <Link
                      to={RouteName.Main}
                      className="user-block__link"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Link>
                  </li>
                </>
              )
              : (
                <li className="user-block__item">
                  <Link to={RouteName.SignIn} className="user-block__link">Sign in</Link>
                </li>
              )
          }
        </ul>
      }
    </header>
  );
}

export default Header;
