export const RouteName = {
  Main: '/',
  Genre: {
    path: '/genre/:genreName',
    name: 'genre'
  },
  SignIn: '/login',
  MyList: '/mylist',
  Film: {
    path: '/films/:id',
    name: 'films'
  },
  Player: {
    path: '/player/:id',
    name: 'player'
  },
  AddReview: {
    path: '/films/:id/review',
    name: 'films'
  },
  NotFound: '*',
};

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments',
}
