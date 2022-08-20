import {signInValidator} from './validator';
import {ErrorMessage} from '../constants/common';

describe('authorization validation test', () => {
  const mockAuth = {
    validEmail: 'mock@app.test',
    invalidEmail: 'invalid.mail',
    validPassword: 'a1',
    invalidPasswordOnlyLetter: 'abc',
    invalidPasswordOnlyNumber: '123',
    invalidPasswordNoLetterNoNumber: '@a1',
  };

  it('invalid email and/or password', () => {
    expect(signInValidator('', '')).toBe(ErrorMessage.SignInValidate);
    expect(signInValidator(mockAuth.validEmail, mockAuth.invalidPasswordOnlyLetter)).toBe(ErrorMessage.SignInValidate);
    expect(signInValidator(mockAuth.validEmail, mockAuth.invalidPasswordOnlyNumber)).toBe(ErrorMessage.SignInValidate);
    expect(signInValidator(mockAuth.validEmail, mockAuth.invalidPasswordNoLetterNoNumber)).toBe(ErrorMessage.SignInValidate);
    expect(signInValidator(mockAuth.invalidEmail, mockAuth.validPassword)).toBe(ErrorMessage.IncorrectEmail);
  });

  it('correct email and password',() => {
    expect(signInValidator(mockAuth.validEmail, mockAuth.validPassword)).toBeNull();
  });
});
