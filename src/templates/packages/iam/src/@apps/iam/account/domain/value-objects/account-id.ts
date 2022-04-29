import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountId extends UuidValueObject
{
    public readonly type: 'AccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}