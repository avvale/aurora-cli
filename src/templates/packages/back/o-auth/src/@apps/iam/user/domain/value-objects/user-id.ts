import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class UserId extends UuidValueObject
{
    public readonly type: 'UserId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}