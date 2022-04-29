import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class RoleCreatedAt extends TimestampValueObject
{
    public readonly type: 'RoleCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}