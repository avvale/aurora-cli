import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectQuery extends JsonValueObject {
  public readonly type: string = 'AuditingSideEffectQuery';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'AuditingSideEffectQuery',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
