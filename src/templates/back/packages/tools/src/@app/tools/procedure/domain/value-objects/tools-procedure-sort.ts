import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureSort extends SmallintValueObject {
  public readonly type: string = 'ToolsProcedureSort';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsProcedureSort',
          nullable: true,
          undefinable: true,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
