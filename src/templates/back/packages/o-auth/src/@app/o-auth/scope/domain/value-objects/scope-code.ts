import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ScopeCode extends StringValueObject {
  public readonly type: string = 'ScopeCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ScopeCode',
          nullable: false,
          undefinable: false,
          maxLength: 20,
        },
        validationRules,
      ),
    );
  }
}
