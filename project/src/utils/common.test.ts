import {datatype} from 'faker/locale/en';
import {formattingCommentDate, formattingDuration, formattingLastTime, getRatingName} from './common';

enum MockRating {
  Bad = 1,
  Normal = 4,
  Good = 7,
  VeryGood = 9,
  Awesome = 11,
}

describe('Utils Functions test', () => {

  it('comment date must the format "June 22, 2022', () => {
    const mockDate = new Date().toISOString();
    const formatDate = formattingCommentDate(mockDate);
    const regExp = new RegExp(/^[A-Z][a-z]+\s[0-9]{2},\s[0-9]{4}$/);

    expect(regExp.test(formatDate)).toBeTruthy();
  });

  it('duration must the format "00h 00m"', () => {
    const mockDuration = datatype.number({min: 1, max: 1000});
    const formatMock = formattingDuration(mockDuration);
    const regExp = new RegExp(/^[0-9]{1,2}h\s[0-9]{1,2}m$/);

    expect(regExp.test(formatMock)).toBeTruthy();
  });

  describe('playback time', () => {
    it('playback time must the format "00: 00: 00", if time > one hour', () => {
      const mockLastTime = datatype.number({min: 90, max: 1000});
      const formatMock = formattingLastTime(mockLastTime);
      const regExp = new RegExp(/^([0-9]{1,2}:\s)?([0-9]{1,2}:\s)?[0-9]{1,2}$/);

      expect(regExp.test(formatMock)).toBeTruthy();
    });

    it('playback time must the format "00: 00:", if time < one hour', () => {
      const mockLastTime = datatype.number({min: 1, max: 60});
      const formatMock = formattingLastTime(mockLastTime);
      const regExp = new RegExp(/^([0-9]{1,2}:\s)?[0-9]{1,2}$/);

      expect(regExp.test(formatMock)).toBeTruthy();
    });
  });

  it('should return rating on text format', () => {
    expect(getRatingName(MockRating.Bad)).toBe('Bad');
    expect(getRatingName(MockRating.Normal)).toBe('Normal');
    expect(getRatingName(MockRating.Good)).toBe('Good');
    expect(getRatingName(MockRating.VeryGood)).toBe('Very Good');
    expect(getRatingName(MockRating.Awesome)).toBe('Awesome');
  });
});
