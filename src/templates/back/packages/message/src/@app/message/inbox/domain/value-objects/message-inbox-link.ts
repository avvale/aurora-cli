import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxLink extends StringValueObject {
  public readonly type: string = 'MessageInboxLink';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxLink',
          nullable: true,
          undefinable: true,
          maxLength: 2046,
        },
        validationRules,
      ),
    );
  }
}
