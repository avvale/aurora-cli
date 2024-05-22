import generatePassword, { GenerateOptions } from 'generate-password-browser';

export const createPassword = (options?: GenerateOptions): string => generatePassword.generate(options);
