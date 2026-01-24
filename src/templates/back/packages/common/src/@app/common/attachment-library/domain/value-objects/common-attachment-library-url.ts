import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryUrl extends StringValueObject {
  public readonly type: string = 'CommonAttachmentLibraryUrl';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentLibraryUrl',
          nullable: false,
          undefinable: false,
          maxLength: 2047,
        },
        validationRules,
      ),
    );
  }
}
