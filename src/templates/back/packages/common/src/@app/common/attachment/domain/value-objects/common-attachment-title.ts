import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentTitle extends StringValueObject {
  public readonly type: string = 'CommonAttachmentTitle';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentTitle',
          nullable: true,
          undefinable: true,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
