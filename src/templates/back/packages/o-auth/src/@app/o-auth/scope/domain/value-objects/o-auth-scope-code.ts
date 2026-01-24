import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthScopeCode extends StringValueObject {
  public readonly type: string = 'OAuthScopeCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthScopeCode',
          nullable: false,
          undefinable: false,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
