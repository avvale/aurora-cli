import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentMeta extends JsonValueObject {
  public readonly type: string = 'SupportCommentMeta';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportCommentMeta',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
