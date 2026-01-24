import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureUpScript extends StringValueObject {
  public readonly type: string = 'ToolsProcedureUpScript';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsProcedureUpScript',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
