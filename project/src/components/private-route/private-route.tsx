import {Navigate} from 'react-router-dom';
import {RouteName} from '../../constants/route-name';
import {AuthStatus} from '../../constants/auth-status';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectAuthStatus} from '../../store/auth-slice/select';

type PrivateRouteProps = {
  children: JSX.Element
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={RouteName.SignIn}/>
  );
}

export default PrivateRoute;
