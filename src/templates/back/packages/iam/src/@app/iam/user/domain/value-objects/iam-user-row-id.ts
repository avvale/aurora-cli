import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserRowId extends BigintValueObject {
  public readonly type: string = 'IamUserRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamUserRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
