import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectOperationSort extends SmallintValueObject
{
    public readonly type: string = 'AuditingSideEffectOperationSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectOperationSort',
            nullable   : true,
            undefinable: true,
            unsigned   : true,
        }, validationRules));
    }
}