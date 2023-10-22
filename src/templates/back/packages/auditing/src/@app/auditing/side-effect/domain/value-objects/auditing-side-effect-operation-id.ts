import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectOperationId extends UuidValueObject
{
    public readonly type: string = 'AuditingSideEffectOperationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuditingSideEffectOperationId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}