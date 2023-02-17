import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectAuditableId extends UuidValueObject
{
    public readonly type: string = 'SideEffectAuditableId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectAuditableId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}