import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentUrl extends StringValueObject {
  public readonly type: string = 'CommonAttachmentUrl';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentUrl',
          nullable: false,
          undefinable: false,
          maxLength: 2047,
        },
        validationRules,
      ),
    );
  }
}
