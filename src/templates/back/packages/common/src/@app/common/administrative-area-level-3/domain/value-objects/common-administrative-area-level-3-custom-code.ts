/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3CustomCode extends StringValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel3CustomCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel3CustomCode',
          nullable: true,
          undefinable: true,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
