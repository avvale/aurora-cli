/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryRowId extends BigintValueObject {
  public readonly type: string = 'CommonCountryRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
