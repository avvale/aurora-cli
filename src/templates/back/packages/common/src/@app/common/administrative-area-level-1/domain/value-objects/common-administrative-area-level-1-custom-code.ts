/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1CustomCode extends StringValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel1CustomCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel1CustomCode',
          nullable: true,
          undefinable: true,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
