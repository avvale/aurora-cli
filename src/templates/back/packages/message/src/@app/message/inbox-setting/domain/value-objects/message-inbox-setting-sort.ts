import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxSettingSort extends IntValueObject {
  public readonly type: string = 'MessageInboxSettingSort';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxSettingSort',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
