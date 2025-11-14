import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectMethod extends EnumValueObject {
    public readonly type: string = 'AuditingSideEffectMethod';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingSideEffectMethod',
                    nullable: true,
                    undefinable: true,
                    enumOptions: ['GET', 'POST', 'UPDATE', 'DELETE'],
                },
                validationRules,
            ),
        );
    }
}
