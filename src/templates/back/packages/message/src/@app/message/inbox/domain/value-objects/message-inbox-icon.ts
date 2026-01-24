import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxIcon extends StringValueObject {
  public readonly type: string = 'MessageInboxIcon';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxIcon',
          nullable: true,
          undefinable: true,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
