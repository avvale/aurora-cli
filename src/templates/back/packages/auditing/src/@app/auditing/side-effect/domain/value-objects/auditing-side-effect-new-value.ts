import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectNewValue extends JsonValueObject
{
    public readonly type: string = 'AuditingSideEffectNewValue';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectNewValue',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}