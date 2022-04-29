import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class RoleAccountId extends UuidValueObject
{
    public readonly type: 'RoleAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleAccountId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}