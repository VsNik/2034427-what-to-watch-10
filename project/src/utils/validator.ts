import {ErrorMessage} from '../constants/common';

export const signInValidator = (email: string, password: string): string | void => {
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = /^[a-zA-Z0-9]+/.test(password);

  if (!email || !isPasswordValid) {
    return ErrorMessage.SignInValidate;
  }

  if (!isEmailValid) {
    return ErrorMessage.IncorrectEmail;
  }
};
