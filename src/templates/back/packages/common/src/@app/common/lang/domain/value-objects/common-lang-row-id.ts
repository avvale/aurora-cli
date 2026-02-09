/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangRowId extends BigintValueObject {
  public readonly type: string = 'CommonLangRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonLangRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
