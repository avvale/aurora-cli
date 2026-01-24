import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxMeta extends JsonValueObject {
  public readonly type: string = 'MessageInboxMeta';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxMeta',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
