import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectUserAgent extends StringValueObject
{
    public readonly type: string = 'AuditingSideEffectUserAgent';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectUserAgent',
            nullable   : true,
            undefinable: true,
            maxLength  : 1023,
        }, validationRules));
    }
}