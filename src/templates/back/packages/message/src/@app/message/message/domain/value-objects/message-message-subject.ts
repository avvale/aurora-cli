import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageSubject extends StringValueObject {
  public readonly type: string = 'MessageMessageSubject';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageMessageSubject',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
