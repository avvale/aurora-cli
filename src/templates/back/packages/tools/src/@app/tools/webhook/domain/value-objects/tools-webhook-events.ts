import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookEvents extends JsonValueObject {
  public readonly type: string = 'ToolsWebhookEvents';

  constructor(value: any[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookEvents',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
