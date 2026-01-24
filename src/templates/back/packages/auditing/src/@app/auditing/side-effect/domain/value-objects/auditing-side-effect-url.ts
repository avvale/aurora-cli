import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectUrl extends StringValueObject {
  public readonly type: 'SideEffectUrl';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SideEffectUrl',
          nullable: true,
          undefinable: true,
          maxLength: 2048,
        },
        validationRules,
      ),
    );
  }
}
