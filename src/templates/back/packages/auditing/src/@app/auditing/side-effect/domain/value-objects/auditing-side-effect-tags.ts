import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectTags extends JsonValueObject
{
    public readonly type: string = 'AuditingSideEffectTags';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectTags',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}