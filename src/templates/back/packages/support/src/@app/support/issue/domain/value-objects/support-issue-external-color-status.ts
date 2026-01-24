import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueExternalColorStatus extends StringValueObject {
  public readonly type: string = 'SupportIssueExternalColorStatus';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportIssueExternalColorStatus',
          nullable: true,
          undefinable: true,
          maxLength: 16,
        },
        validationRules,
      ),
    );
  }
}
