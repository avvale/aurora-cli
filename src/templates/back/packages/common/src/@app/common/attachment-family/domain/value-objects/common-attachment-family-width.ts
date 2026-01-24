import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyWidth extends IntValueObject {
  public readonly type: string = 'CommonAttachmentFamilyWidth';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentFamilyWidth',
          nullable: true,
          undefinable: true,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
