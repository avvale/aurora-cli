import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageTotalRecipients extends IntValueObject {
  public readonly type: string = 'MessageMessageTotalRecipients';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageMessageTotalRecipients',
          nullable: false,
          undefinable: false,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
