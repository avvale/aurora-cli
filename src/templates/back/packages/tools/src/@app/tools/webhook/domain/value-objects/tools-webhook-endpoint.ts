import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookEndpoint extends StringValueObject {
  public readonly type: string = 'ToolsWebhookEndpoint';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookEndpoint',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
