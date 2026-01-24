import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenRowId extends BigintValueObject {
  public readonly type: string = 'OAuthAccessTokenRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'OAuthAccessTokenRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
