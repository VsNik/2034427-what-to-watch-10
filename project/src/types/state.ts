import {store} from '../store';
import {rootReducer} from '../store/root-reducer';

export type Reducer = ReturnType<typeof rootReducer>;

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
