import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageBody extends StringValueObject {
  public readonly type: string = 'MessageMessageBody';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageMessageBody',
          nullable: false,
          undefinable: false,
        },
        validationRules,
      ),
    );
  }
}
