/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  DataValueObject,
  UuidValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Id extends UuidValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel1Id';

  constructor(
    value: string,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel1Id',
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
