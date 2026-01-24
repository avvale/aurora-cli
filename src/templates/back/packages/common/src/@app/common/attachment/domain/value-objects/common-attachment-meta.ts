import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentMeta extends JsonValueObject {
  public readonly type: string = 'CommonAttachmentMeta';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentMeta',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
