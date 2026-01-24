import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxImage extends JsonValueObject {
  public readonly type: string = 'MessageInboxImage';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageInboxImage',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
