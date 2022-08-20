import {Route, Routes} from 'react-router-dom';
import {AddReview, Main, Movie, MyList, NotFound, Player, SignIn} from '../../pages';
import {PrivateRoute} from '../';
import {RouteName} from '../../constants/route-name';
import {AuthStatus} from '../../constants/common';
import {RouteType} from '../../types/common';
import {useAppSelector} from '../../hooks/use-app-selector';
import Loader from '../loader/loader';
import {selectIsLoadedError, selectIsLoadedFilms} from '../../store/films-slice/select';
import {selectIsLoadedPromo, selectIsPromoError} from '../../store/promo-slice/select';
import {selectAuthStatus} from '../../store/auth-slice/select';
import ServerError from '../server-error/server-error';

function App(): JSX.Element {
  const isFilmsLoaded = useAppSelector(selectIsLoadedFilms);
  const isErrorLoadFilms = useAppSelector(selectIsLoadedError);
  const isPromoLoaded = useAppSelector(selectIsLoadedPromo);
  const isErrorLoadPromo = useAppSelector(selectIsPromoError);
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

  if (authStatus === AuthStatus.Unknown || isFilmsLoaded || isPromoLoaded) {
    return <Loader/>;
  }

  if (isErrorLoadFilms || isErrorLoadPromo) {
    return <ServerError/>;
  }

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
}

export default App;
