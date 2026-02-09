/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangIetf extends StringValueObject {
  public readonly type: string = 'CommonLangIetf';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonLangIetf',
          nullable: false,
          undefinable: false,
          length: 5,
        },
        validationRules,
      ),
    );
  }
}
