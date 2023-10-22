import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectOperationSort extends IntValueObject
{
    public readonly type: string = 'AuditingSideEffectOperationSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectOperationSort',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}