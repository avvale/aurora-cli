import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationExpiration extends StringValueObject {
  public readonly type: string = 'WhatsappConversationExpiration';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'WhatsappConversationExpiration',
          nullable: false,
          undefinable: false,
          maxLength: 36,
        },
        validationRules,
      ),
    );
  }
}
