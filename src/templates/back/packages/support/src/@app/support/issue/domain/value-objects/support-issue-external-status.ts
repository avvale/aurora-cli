import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueExternalStatus extends StringValueObject {
  public readonly type: string = 'SupportIssueExternalStatus';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportIssueExternalStatus',
          nullable: true,
          undefinable: true,
          maxLength: 36,
        },
        validationRules,
      ),
    );
  }
}
