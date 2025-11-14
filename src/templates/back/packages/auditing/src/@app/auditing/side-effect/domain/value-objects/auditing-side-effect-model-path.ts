import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectModelPath extends StringValueObject {
    public readonly type: string = 'AuditingSideEffectModelPath';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingSideEffectModelPath',
                    nullable: false,
                    undefinable: false,
                    maxLength: 1022,
                },
                validationRules,
            ),
        );
    }
}
