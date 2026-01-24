import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryOriginFilename extends StringValueObject {
  public readonly type: string = 'CommonAttachmentLibraryOriginFilename';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentLibraryOriginFilename',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
