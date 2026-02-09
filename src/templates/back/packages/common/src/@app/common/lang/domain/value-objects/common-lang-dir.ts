/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangDir extends EnumValueObject<'LTR' | 'RTL'> {
  public readonly type: string = 'CommonLangDir';

  constructor(value: 'LTR' | 'RTL', validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonLangDir',
          nullable: false,
          undefinable: false,
          enumOptions: ['LTR', 'RTL'],
        },
        validationRules,
      ),
    );
  }
}
