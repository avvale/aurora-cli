import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxScopeRecipients extends JsonValueObject {
  public readonly type: string = 'MessageOutboxScopeRecipients';

  constructor(value: any[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageOutboxScopeRecipients',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
