/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  DataValueObject,
  TimestampValueObject,
  ValidationRules,
} from '@aurorajs.dev/core';

export class CommonLangCreatedAt extends TimestampValueObject {
  public readonly type: string = 'CommonLangCreatedAt';

  constructor(
    value: string | DataValueObject,
    validationRules: ValidationRules = {},
    data: DataValueObject = {},
  ) {
    super(
      value,
      Object.assign(
        {
          name: 'CommonLangCreatedAt',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
      data,
    );
  }
}
