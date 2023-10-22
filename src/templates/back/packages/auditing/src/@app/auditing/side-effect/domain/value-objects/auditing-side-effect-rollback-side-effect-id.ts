import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectRollbackSideEffectId extends UuidValueObject
{
    public readonly type: string = 'AuditingSideEffectRollbackSideEffectId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectRollbackSideEffectId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}