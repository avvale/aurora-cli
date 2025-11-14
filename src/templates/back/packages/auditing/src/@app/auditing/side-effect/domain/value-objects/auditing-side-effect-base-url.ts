import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectBaseUrl extends StringValueObject {
    public readonly type: string = 'AuditingSideEffectBaseUrl';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingSideEffectBaseUrl',
                    nullable: true,
                    undefinable: true,
                    maxLength: 2046,
                },
                validationRules,
            ),
        );
    }
}
