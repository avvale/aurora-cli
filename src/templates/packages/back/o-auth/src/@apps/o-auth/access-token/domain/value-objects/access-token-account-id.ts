import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class AccessTokenAccountId extends UuidValueObject
{
    public readonly type: 'AccessTokenAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenAccountId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}