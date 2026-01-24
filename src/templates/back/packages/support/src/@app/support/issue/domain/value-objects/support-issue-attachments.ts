import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueAttachments extends JsonValueObject {
  public readonly type: string = 'SupportIssueAttachments';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportIssueAttachments',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
