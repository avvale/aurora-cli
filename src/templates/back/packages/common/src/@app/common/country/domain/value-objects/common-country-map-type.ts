/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryMapType extends EnumValueObject<
  'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN'
> {
  public readonly type: string = 'CommonCountryMapType';

  constructor(
    value: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN',
    validationRules: ValidationRules = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryMapType',
          nullable: true,
          undefinable: true,
          enumOptions: ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'],
        },
        validationRules,
      ),
    );
  }
}
