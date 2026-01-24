import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentOriginFilename extends StringValueObject {
  public readonly type: string = 'CommonAttachmentOriginFilename';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentOriginFilename',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
