import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxSort extends IntValueObject {
  public readonly type: string = 'MessageInboxSort';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxSort',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
