import {renderHook} from '@testing-library/react';
import {useValidComment} from './use-valid-comment';
import {makeFakeReview} from '../utils/mocks';

const NO_RATING = 0;
const RATING = 5;
const mockComment = makeFakeReview();

const mockUseValidateComment = (commit: string, rating: number) => renderHook(() =>
  useValidComment(commit, rating),
);

describe('Hook: useValidComment', () => {
  it('should return false if short comment', () => {
    const {result} = mockUseValidateComment(mockComment.short, RATING);
    const isValidForm = result.current;
    expect(isValidForm).toBeFalsy();
  });

  it('should return false if long comment', () => {
    const {result} = mockUseValidateComment(mockComment.long, RATING);
    const isValidForm = result.current;
    expect(isValidForm).toBeFalsy();
  });

  it('should return true if normal comment length', () => {
    const {result} = mockUseValidateComment(mockComment.normal, RATING);
    const isValidForm = result.current;
    expect(isValidForm).toBeTruthy();
  });

  it('should return false if no selected rating', () => {
    const {result} = mockUseValidateComment(mockComment.normal, NO_RATING);
    const isValidForm = result.current;
    expect(isValidForm).toBeFalsy();
  });

  it('should return true if rating selected', () => {
    const {result} = mockUseValidateComment(mockComment.normal, RATING);
    const isValidForm = result.current;
    expect(isValidForm).toBeTruthy();
  });
});
