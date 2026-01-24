import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxSettingLastReadMessageRowId extends BigintValueObject {
  public readonly type: string = 'MessageInboxSettingLastReadMessageRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxSettingLastReadMessageRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
