import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyFormat extends EnumValueObject {
  public readonly type: string = 'CommonAttachmentFamilyFormat';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentFamilyFormat',
          nullable: true,
          undefinable: true,
          enumOptions: ['JPG', 'PNG', 'GIF', 'TIF', 'BMP'],
        },
        validationRules,
      ),
    );
  }
}
