import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentHeight extends IntValueObject {
  public readonly type: string = 'CommonAttachmentHeight';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentHeight',
          nullable: true,
          undefinable: true,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
