import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageLink extends StringValueObject {
  public readonly type: string = 'MessageMessageLink';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageMessageLink',
          nullable: true,
          undefinable: true,
          maxLength: 2046,
        },
        validationRules,
      ),
    );
  }
}
