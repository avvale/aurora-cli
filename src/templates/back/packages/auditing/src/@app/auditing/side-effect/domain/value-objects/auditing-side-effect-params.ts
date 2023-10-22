import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectParams extends JsonValueObject
{
    public readonly type: string = 'AuditingSideEffectParams';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectParams',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}