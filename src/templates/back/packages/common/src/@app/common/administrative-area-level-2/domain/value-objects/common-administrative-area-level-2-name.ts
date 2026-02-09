/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2Name extends StringValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel2Name';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel2Name',
          nullable: false,
          undefinable: false,
          maxLength: 128,
        },
        validationRules,
      ),
    );
  }
}
