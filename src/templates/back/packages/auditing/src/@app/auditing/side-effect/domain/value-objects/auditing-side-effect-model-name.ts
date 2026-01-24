import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectModelName extends StringValueObject {
  public readonly type: string = 'AuditingSideEffectModelName';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'AuditingSideEffectModelName',
          nullable: false,
          undefinable: false,
          maxLength: 255,
        },
        validationRules,
      ),
    );
  }
}
