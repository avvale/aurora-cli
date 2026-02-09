/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  DataValueObject,
  UuidValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3CountryId extends UuidValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel3CountryId';

  constructor(
    value: string,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel3CountryId',
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
