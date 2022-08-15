import {lorem, datatype, internet, image, name} from 'faker/locale/en';
import {AuthData, CommentType, FilmType, NewCommentType, UserData} from '../types/common';
import {CommentLength} from '../constants/common';

export const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
export const MOCK_AVATAR = 'mock-avatar.png';
export const MOCK_TOKEN = 'mock-token';
export const MOCK_ERROR = 'mock-error';
export const MOCK_ID = 1;
export const VIDEO_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

export const makeFakeFilm = (): FilmType => ({
  id: datatype.number({min: 1}),
  name: lorem.words(3),
  posterImage: image.abstract(),
  previewImage: image.abstract(),
  backgroundImage: image.abstract(),
  backgroundColor: internet.color(),
  videoLink: VIDEO_URL,
  previewVideoLink: VIDEO_URL,
  description: lorem.paragraph(),
  rating: datatype.number({min: 0, max: 10}),
  scoresCount: datatype.number(1000),
  director: name.findName(),
  starring: Array.from({length: 3}, () => name.findName()),
  runTime: datatype.number({min: 40, max: 240}),
  genre: lorem.word(),
  released: datatype.number({min: 1990, max: 2022}),
  isFavorite: false,
});

export const makeFakeFilms = (): FilmType[] =>
  Array.from({length: 10}, () => makeFakeFilm());

export const makeFakeComment = (): CommentType => ({
  comment: lorem.words(10),
  date: datatype.datetime().toISOString(),
  id: datatype.number({min: 1}),
  rating: datatype.number({min: 1, max: 10}),
  user: {
    id: datatype.number({min: 1}),
    name: internet.userName(),
  },
});

export const makeFakeComments = (): CommentType[] =>
  Array.from({length: 3}, () => makeFakeComment());

export const makeFakeNewComment = (): NewCommentType => ({
  comment: lorem.sentence(15),
  rating: datatype.number({min: 1, max: 10}),
  filmId: MOCK_ID
});

export const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: datatype.string(5),
});

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number({min: 1}),
  name: internet.userName(),
  token: MOCK_TOKEN,
});

export const makeFakeReview = () => ({
  short: datatype.string(CommentLength.Min - 1),
  long: datatype.string(CommentLength.Max + 1),
  normal: datatype.string(CommentLength.Min + 1),
});

export const makeDefaultFilm = (): FilmType => ({
  id: 0,
  name: '',
  posterImage: '',
  previewImage: '',
  backgroundImage: '',
  backgroundColor: '',
  videoLink: '',
  previewVideoLink: '',
  description: '',
  rating: 0,
  scoresCount: 0,
  director: '',
  starring: [],
  runTime: 0,
  genre: '',
  released: 0,
  isFavorite: false,
});
