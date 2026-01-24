export enum SharedAccessSignatureAccessType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export enum SharedAccessSignatureExpiration {
  TEN_SECONDS = 10 * 1000,
  THIRTY_SECONDS = 30 * 1000,
  TEN_MINUTES = 10 * 60 * 1000,
  THREE_DAYS = 3 * 24 * 60 * 60 * 1000,
}

export enum SharedAccessSignaturePermissions {
  READ = 'r',
  WRITE = 'w',
  CREATE = 'c',
  DELETE = 'd',
  LIST = 'l',
  ADD = 'a',
  UPDATE = 'u',
  PROCESS = 'p',
  READ_WRITE = 'rw',
  CREATE_WRITE = 'cw',
}
