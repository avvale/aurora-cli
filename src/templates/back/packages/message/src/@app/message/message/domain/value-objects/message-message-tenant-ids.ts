import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageTenantIds extends JsonValueObject {
  public readonly type: string = 'MessageMessageTenantIds';

  constructor(value: any[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'MessageMessageTenantIds',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
