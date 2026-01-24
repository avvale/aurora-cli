import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFilename extends StringValueObject {
  public readonly type: string = 'CommonAttachmentFilename';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentFilename',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
