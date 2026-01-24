import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookLogHeaderRequest extends JsonValueObject {
  public readonly type: string = 'ToolsWebhookLogHeaderRequest';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookLogHeaderRequest',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
