/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  DataValueObject,
  TimestampValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class CommonResourceCreatedAt extends TimestampValueObject {
  public readonly type: string = 'CommonResourceCreatedAt';

  constructor(
    value: string | DataValueObject,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonResourceCreatedAt',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
      data,
    );
  }
}
