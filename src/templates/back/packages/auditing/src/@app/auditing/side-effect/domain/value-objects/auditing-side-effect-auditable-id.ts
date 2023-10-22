import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectAuditableId extends UuidValueObject
{
    public readonly type: string = 'AuditingSideEffectAuditableId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectAuditableId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}