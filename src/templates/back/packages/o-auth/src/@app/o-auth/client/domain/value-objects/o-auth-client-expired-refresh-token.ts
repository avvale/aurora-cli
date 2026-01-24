import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientExpiredRefreshToken extends IntValueObject {
  public readonly type: string = 'OAuthClientExpiredRefreshToken';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthClientExpiredRefreshToken',
          nullable: true,
          undefinable: true,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
