import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationWabaContactId extends StringValueObject {
  public readonly type: string = 'WhatsappConversationWabaContactId';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'WhatsappConversationWabaContactId',
          nullable: false,
          undefinable: false,
          maxLength: 36,
        },
        validationRules,
      ),
    );
  }
}
