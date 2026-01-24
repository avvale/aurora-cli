import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamRoleRowId extends BigintValueObject {
  public readonly type: string = 'IamRoleRowId';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamRoleRowId',
          nullable: false,
          undefinable: false,
          unsigned: false,
        },
        validationRules,
      ),
    );
  }
}
