import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookName extends StringValueObject {
  public readonly type: string = 'ToolsWebhookName';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookName',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
