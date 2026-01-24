import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyFitType extends EnumValueObject {
  public readonly type: string = 'CommonAttachmentFamilyFitType';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentFamilyFitType',
          nullable: true,
          undefinable: true,
          enumOptions: [
            'FIT_CROP',
            'FIT_WIDTH',
            'FIT_HEIGHT',
            'FIT_WIDTH_FREE_CROP',
            'FIT_HEIGHT_FREE_CROP',
          ],
        },
        validationRules,
      ),
    );
  }
}
