/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  DataValueObject,
  UuidValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class CommonCountryId extends UuidValueObject {
  public readonly type: string = 'CommonCountryId';

  constructor(
    value: string,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonCountryId',
          nullable: false,
          undefinable: false,
          length: 36,
        },
        validationRules,
      ),
      data,
    );
  }
}
