import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookService extends StringValueObject {
  public readonly type: string = 'ToolsWebhookService';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookService',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
