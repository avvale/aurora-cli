import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationName extends StringValueObject {
  public readonly type: string = 'ToolsMigrationName';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsMigrationName',
          nullable: false,
          undefinable: false,
          maxLength: 128,
        },
        validationRules,
      ),
    );
  }
}
