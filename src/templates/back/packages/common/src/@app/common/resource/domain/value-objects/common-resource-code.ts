/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonResourceCode extends StringValueObject {
  public readonly type: string = 'CommonResourceCode';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonResourceCode',
          nullable: false,
          undefinable: false,
          maxLength: 64,
        },
        validationRules,
      ),
    );
  }
}
