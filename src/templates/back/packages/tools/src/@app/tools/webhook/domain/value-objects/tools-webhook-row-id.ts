import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookRowId extends BigintValueObject {
  public readonly type: string = 'ToolsWebhookRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsWebhookRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
