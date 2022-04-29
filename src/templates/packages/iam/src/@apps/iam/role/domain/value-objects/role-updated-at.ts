import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class RoleUpdatedAt extends TimestampValueObject
{
    public readonly type: 'RoleUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}