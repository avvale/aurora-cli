/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2MapType extends EnumValueObject<
  'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN'
> {
  public readonly type: string = 'CommonAdministrativeAreaLevel2MapType';

  constructor(
    value: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN',
    validationRules: ValidationRules = {},
  ) {
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
