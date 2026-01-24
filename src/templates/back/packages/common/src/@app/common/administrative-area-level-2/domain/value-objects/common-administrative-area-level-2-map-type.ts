import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2MapType extends EnumValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel2MapType';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel2MapType',
          nullable: true,
          undefinable: true,
          enumOptions: ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'],
        },
        validationRules,
      ),
    );
  }
}
