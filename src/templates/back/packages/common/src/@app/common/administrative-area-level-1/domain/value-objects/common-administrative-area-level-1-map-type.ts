/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1MapType extends EnumValueObject<
  'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN'
> {
  public readonly type: string = 'CommonAdministrativeAreaLevel1MapType';

  constructor(
    value: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN',
    validationRules: ValidationRules = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel1MapType',
          nullable: true,
          undefinable: true,
          enumOptions: ['ROADMAP', 'SATELLITE', 'HYBRID', 'TERRAIN'],
        },
        validationRules,
      ),
    );
  }
}
