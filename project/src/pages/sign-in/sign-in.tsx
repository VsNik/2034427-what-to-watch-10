import {FormEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Footer, Header} from '../../components';
import {RouteName} from '../../constants/route-name';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {loginAction} from '../../store/api-actions';
import {selectAuthStatus, selectError} from '../../store/auth-slice/select';
import {setError} from '../../store/auth-slice/auth-slice';
import {AuthStatus} from '../../constants/common';

const MESSAGE = 'We can’t recognize this email and password combination. Please try again.';

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectError);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!email || !password) {
      dispatch(setError(MESSAGE));
    } else {
      dispatch(loginAction({login: email, password}));
    }
  };

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={RouteName.Main}/>;
  }

  return (
    <div className="user-page">
      <Header className="user-page__head">
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {
            error &&
            <div className="sign-in__message">
              <p>{error}</p>
            </div>
          }

          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}

export default SignIn;
