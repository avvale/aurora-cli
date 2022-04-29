import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryId extends UuidValueObject
{
    public readonly type: 'CountryId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}