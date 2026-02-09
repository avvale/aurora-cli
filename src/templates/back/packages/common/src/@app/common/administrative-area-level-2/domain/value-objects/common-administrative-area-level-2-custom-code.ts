/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2CustomCode extends StringValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel2CustomCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel2CustomCode',
          nullable: true,
          undefinable: true,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
