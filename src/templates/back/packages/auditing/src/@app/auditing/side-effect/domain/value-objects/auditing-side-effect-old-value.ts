import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectOldValue extends JsonValueObject {
  public readonly type: string = 'AuditingSideEffectOldValue';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'AuditingSideEffectOldValue',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
