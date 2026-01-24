import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyCode extends StringValueObject {
  public readonly type: string = 'CommonAttachmentFamilyCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentFamilyCode',
          nullable: false,
          undefinable: false,
          maxLength: 63,
        },
        validationRules,
      ),
    );
  }
}
