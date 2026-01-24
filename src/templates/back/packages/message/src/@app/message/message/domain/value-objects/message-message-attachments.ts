import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageAttachments extends JsonValueObject {
  public readonly type: string = 'MessageMessageAttachments';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageMessageAttachments',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
