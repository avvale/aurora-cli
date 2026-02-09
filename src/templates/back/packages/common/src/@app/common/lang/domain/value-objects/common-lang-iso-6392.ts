/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangIso6392 extends StringValueObject {
  public readonly type: string = 'CommonLangIso6392';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonLangIso6392',
          nullable: false,
          undefinable: false,
          length: 2,
        },
        validationRules,
      ),
    );
  }
}
