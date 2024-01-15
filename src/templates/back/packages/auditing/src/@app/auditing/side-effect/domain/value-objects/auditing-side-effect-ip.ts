import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectIp extends StringValueObject
{
    public readonly type: string = 'AuditingSideEffectIp';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectIp',
            nullable   : true,
            undefinable: true,
            maxLength  : 19,
        }, validationRules));
    }
}