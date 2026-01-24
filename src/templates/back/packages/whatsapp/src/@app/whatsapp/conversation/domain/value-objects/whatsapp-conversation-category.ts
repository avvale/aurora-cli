import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationCategory extends StringValueObject {
  public readonly type: string = 'WhatsappConversationCategory';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'WhatsappConversationCategory',
          nullable: false,
          undefinable: false,
          maxLength: 63,
        },
        validationRules,
      ),
    );
  }
}
