import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookLogUrl extends StringValueObject {
  public readonly type: string = 'ToolsWebhookLogUrl';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookLogUrl',
          nullable: false,
          undefinable: false,
          maxLength: 2046,
        },
        validationRules,
      ),
    );
  }
}
