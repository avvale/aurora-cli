/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Latitude extends DecimalValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel1Latitude';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel1Latitude',
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
