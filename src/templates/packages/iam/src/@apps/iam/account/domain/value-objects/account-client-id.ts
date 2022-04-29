import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountClientId extends UuidValueObject
{
    public readonly type: 'AccountClientId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountClientId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}