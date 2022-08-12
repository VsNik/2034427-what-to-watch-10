import {lorem, datatype, internet, image, name} from 'faker/locale/en';
import {CommentType, FilmType, UserData} from '../types/common';

export const makeFakeFilm = (): FilmType => ({
  id: datatype.number({min: 1}),
  name: lorem.words(3),
  posterImage: image.abstract(),
  previewImage: image.abstract(),
  backgroundImage: image.abstract(),
  backgroundColor: internet.color(),
  videoLink: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  previewVideoLink: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
  Array.from({length: 3}, () => makeFakeFilm());

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

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number({min: 1}),
  name: internet.userName(),
  token: 'token'
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
