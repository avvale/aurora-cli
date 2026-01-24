import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryHeight extends IntValueObject {
  public readonly type: string = 'CommonAttachmentLibraryHeight';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentLibraryHeight',
          nullable: false,
          undefinable: false,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
