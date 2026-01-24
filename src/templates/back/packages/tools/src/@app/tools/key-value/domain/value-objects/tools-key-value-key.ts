import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsKeyValueKey extends StringValueObject {
  public readonly type: string = 'ToolsKeyValueKey';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsKeyValueKey',
          nullable: false,
          undefinable: false,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
