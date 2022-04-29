import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class UserAccountId extends UuidValueObject
{
    public readonly type: 'UserAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserAccountId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}