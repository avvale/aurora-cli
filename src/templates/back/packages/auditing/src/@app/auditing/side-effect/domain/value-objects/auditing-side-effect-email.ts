import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectEmail extends StringValueObject
{
    public readonly type: string = 'AuditingSideEffectEmail';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectEmail',
            nullable   : false,
            undefinable: false,
            maxLength  : 120,
        }, validationRules));
    }
}