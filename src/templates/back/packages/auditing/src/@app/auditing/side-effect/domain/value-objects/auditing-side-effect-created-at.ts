import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AuditingSideEffectCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}