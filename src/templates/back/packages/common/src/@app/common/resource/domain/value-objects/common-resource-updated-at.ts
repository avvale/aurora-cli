/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  DataValueObject,
  TimestampValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class CommonResourceUpdatedAt extends TimestampValueObject {
  public readonly type: string = 'CommonResourceUpdatedAt';

  constructor(
    value: string | DataValueObject,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonResourceUpdatedAt',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
      data,
    );
  }
}
