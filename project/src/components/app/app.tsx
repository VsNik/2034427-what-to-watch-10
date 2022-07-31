import {Route, Routes} from 'react-router-dom';
import {AddReview, Main, Movie, MyList, NotFound, Player, SignIn} from '../../pages';
import {PrivateRoute} from '../';
import {RouteName} from '../../constants/route-name';
import {AuthStatus} from '../../constants/auth-status';
import {RouteType} from '../../types/route-type';
import {useAppSelector} from '../../hooks';
import {selectAuthStatus, selectIsDataLoaded} from '../../store/select';
import Loader from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../utils/browser-history';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(selectIsDataLoaded);
  const authStatus = useAppSelector(selectAuthStatus);
  const routes: RouteType[] = [
    {
      path: RouteName.Main,
      element: <Main/>
    },
    {
      path: RouteName.Genre.path,
      element: <Main/>
    },
    {
      path: RouteName.SignIn,
      element: <SignIn/>
    },
    {
      path: RouteName.MyList,
      element: (
        <PrivateRoute>
          <MyList/>
        </PrivateRoute>
      )
    },
    {
      path: RouteName.Film.path,
      element: <Movie/>
    },
    {
      path: RouteName.AddReview.path,
      element: (
        <PrivateRoute>
          <AddReview/>
        </PrivateRoute>
      )
    },
    {
      path: RouteName.Player.path,
      element: <Player/>
    },
    {
      path: RouteName.NotFound,
      element: <NotFound/>
    },
  ];

  if (authStatus === AuthStatus.Unknown || isDataLoaded) {
    return <Loader/>;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </HistoryRouter>
  );
}

export default App;
