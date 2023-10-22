import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectBody extends JsonValueObject
{
    public readonly type: string = 'AuditingSideEffectBody';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectBody',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}