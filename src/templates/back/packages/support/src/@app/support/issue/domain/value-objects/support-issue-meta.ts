import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueMeta extends JsonValueObject {
  public readonly type: string = 'SupportIssueMeta';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportIssueMeta',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
