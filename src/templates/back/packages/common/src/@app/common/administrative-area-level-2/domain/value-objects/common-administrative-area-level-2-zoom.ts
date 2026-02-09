/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2Zoom extends SmallintValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel2Zoom';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel2Zoom',
          nullable: true,
          undefinable: true,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
