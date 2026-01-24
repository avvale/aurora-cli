import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationWabaConversationId extends StringValueObject {
  public readonly type: string = 'WhatsappConversationWabaConversationId';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'WhatsappConversationWabaConversationId',
          nullable: false,
          undefinable: false,
          maxLength: 63,
        },
        validationRules,
      ),
    );
  }
}
