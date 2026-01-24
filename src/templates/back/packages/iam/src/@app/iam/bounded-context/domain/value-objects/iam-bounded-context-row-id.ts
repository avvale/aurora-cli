/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamBoundedContextRowId extends BigintValueObject {
  public readonly type: string = 'IamBoundedContextRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamBoundedContextRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
