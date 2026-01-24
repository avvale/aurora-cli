import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsKeyValueDescription extends StringValueObject {
  public readonly type: string = 'ToolsKeyValueDescription';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsKeyValueDescription',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
