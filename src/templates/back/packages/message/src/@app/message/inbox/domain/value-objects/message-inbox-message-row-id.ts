import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxMessageRowId extends BigintValueObject {
  public readonly type: string = 'MessageInboxMessageRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxMessageRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
