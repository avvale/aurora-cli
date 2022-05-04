import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class RoleDeletedAt extends TimestampValueObject
{
    public readonly type: 'RoleDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}