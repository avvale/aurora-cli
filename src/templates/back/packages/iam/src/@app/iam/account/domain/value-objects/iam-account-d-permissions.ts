import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountDPermissions extends JsonValueObject {
  public readonly type: string = 'IamAccountDPermissions';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'IamAccountDPermissions',
          nullable: false,
          undefinable: false,
        },
        validationRules,
      ),
    );
  }
}
