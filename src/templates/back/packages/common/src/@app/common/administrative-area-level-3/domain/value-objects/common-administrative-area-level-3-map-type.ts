/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3MapType extends EnumValueObject<
  'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN'
> {
  public readonly type: string = 'CommonAdministrativeAreaLevel3MapType';

  constructor(
    value: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN',
    validationRules: ValidationRules = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel3MapType',
          nullable: true,
          undefinable: true,
          enumOptions: ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'],
        },
        validationRules,
      ),
    );
  }
}
