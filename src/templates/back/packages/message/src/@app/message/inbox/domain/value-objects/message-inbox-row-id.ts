import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxRowId extends BigintValueObject {
  public readonly type: string = 'MessageInboxRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
