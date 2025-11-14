import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectRowId extends BigintValueObject {
    public readonly type: string = 'AuditingSideEffectRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingSideEffectRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
