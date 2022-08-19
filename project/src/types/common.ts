export type FilmType = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type ReviewUserType = {
  id: number;
  name: string;
}

export type CommentType = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: ReviewUserType;
}

export type NewCommentType = {
  filmId: number,
  comment: string;
  rating: number;
}

export type RouteType = {
  path: string;
  element: JSX.Element;
}

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  avatarUrl: string;
  email: string;
  name: string;
  token: string;
};

