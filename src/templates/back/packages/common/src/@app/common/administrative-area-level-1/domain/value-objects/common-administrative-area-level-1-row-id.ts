/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1RowId extends BigintValueObject {
  public readonly type: string = 'CommonAdministrativeAreaLevel1RowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonAdministrativeAreaLevel1RowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
