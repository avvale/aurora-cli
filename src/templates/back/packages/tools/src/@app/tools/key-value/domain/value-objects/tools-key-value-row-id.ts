import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsKeyValueRowId extends BigintValueObject {
  public readonly type: string = 'ToolsKeyValueRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsKeyValueRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
