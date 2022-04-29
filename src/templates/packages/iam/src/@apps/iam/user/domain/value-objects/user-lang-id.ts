import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class UserLangId extends UuidValueObject
{
    public readonly type: 'UserLangId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserLangId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}