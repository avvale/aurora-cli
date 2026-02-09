/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nRowId extends BigintValueObject {
  public readonly type: string = 'CommonCountryI18nRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryI18nRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
