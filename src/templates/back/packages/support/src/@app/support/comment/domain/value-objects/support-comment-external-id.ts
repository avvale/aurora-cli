import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentExternalId extends StringValueObject {
  public readonly type: string = 'SupportCommentExternalId';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportCommentExternalId',
          nullable: true,
          undefinable: true,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
