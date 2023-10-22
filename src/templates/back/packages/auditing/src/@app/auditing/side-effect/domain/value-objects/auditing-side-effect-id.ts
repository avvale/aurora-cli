import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectId extends UuidValueObject
{
    public readonly type: string = 'AuditingSideEffectId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}