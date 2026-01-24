import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyName extends StringValueObject {
  public readonly type: string = 'CommonAttachmentFamilyName';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentFamilyName',
          nullable: false,
          undefinable: false,
          maxLength: 100,
        },
        validationRules,
      ),
    );
  }
}
