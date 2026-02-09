/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangImage extends StringValueObject {
  public readonly type: string = 'CommonLangImage';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonLangImage',
          nullable: true,
          undefinable: true,
          maxLength: 1022,
        },
        validationRules,
      ),
    );
  }
}
