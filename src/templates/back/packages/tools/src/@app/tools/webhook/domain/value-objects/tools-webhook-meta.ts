import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookMeta extends JsonValueObject {
  public readonly type: string = 'ToolsWebhookMeta';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookMeta',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
