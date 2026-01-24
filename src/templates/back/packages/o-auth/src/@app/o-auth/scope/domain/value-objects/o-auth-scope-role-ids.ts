import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthScopeRoleIds extends JsonValueObject {
  public readonly type: string = 'OAuthScopeRoleIds';

  constructor(value: any[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthScopeRoleIds',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
