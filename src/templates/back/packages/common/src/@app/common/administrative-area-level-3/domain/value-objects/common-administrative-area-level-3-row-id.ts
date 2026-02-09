/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3RowId extends BigintValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel3RowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel3RowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
