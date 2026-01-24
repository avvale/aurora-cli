import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTagRowId extends BigintValueObject {
  public readonly type: string = 'IamTagRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamTagRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
