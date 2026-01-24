import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueDescription extends StringValueObject {
  public readonly type: string = 'SupportIssueDescription';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportIssueDescription',
          nullable: false,
          undefinable: false,
        },
        validationRules,
      ),
    );
  }
}
