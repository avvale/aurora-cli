import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilySizes extends JsonValueObject {
  public readonly type: string = 'CommonAttachmentFamilySizes';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAttachmentFamilySizes',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
