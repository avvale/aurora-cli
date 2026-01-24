import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueBackEnvironment extends StringValueObject {
  public readonly type: string = 'SupportIssueBackEnvironment';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportIssueBackEnvironment',
          nullable: true,
          undefinable: true,
          maxLength: 36,
        },
        validationRules,
      ),
    );
  }
}
