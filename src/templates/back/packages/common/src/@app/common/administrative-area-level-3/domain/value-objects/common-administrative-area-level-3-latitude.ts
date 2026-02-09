/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3Latitude extends DecimalValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel3Latitude';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel3Latitude',
          nullable: true,
          undefinable: true,
          decimals: [16, 14],
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
