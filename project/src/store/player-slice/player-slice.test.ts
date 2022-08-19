import {PlayerSlice} from '../../types/state';
import {PlayType} from '../../constants/common';
import {playerSlice, setPlayType} from './player-slice';
import {UNKNOWN_ACTION} from '../../utils/mocks';

describe('Slice: player', () => {
  let state: PlayerSlice;

  beforeEach(() => {
    state = {
      playType: PlayType.Unknown,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(playerSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({playType: PlayType.Unknown});
  });

  it('should update playType', () => {
    expect(playerSlice.reducer(state, setPlayType(PlayType.Promo)))
      .toEqual({playType: PlayType.Promo});
  });
});
