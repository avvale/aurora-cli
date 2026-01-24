import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageStatus extends EnumValueObject {
  public readonly type: string = 'MessageMessageStatus';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageMessageStatus',
          nullable: false,
          undefinable: false,
          enumOptions: ['DRAFT', 'PENDING', 'SENT'],
        },
        validationRules,
      ),
    );
  }
}
