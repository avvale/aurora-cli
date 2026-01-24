import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsInformationSchemaRawSql extends StringValueObject {
  public readonly type: string = 'ToolsInformationSchemaRawSql';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'ToolsInformationSchemaRawSql',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
