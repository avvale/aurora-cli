import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenScopes extends JsonValueObject {
  public readonly type: 'OAuthAccessTokenScopes';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthAccessTokenScopes',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
