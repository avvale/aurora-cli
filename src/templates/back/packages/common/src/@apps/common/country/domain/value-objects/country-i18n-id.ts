import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18NId extends UuidValueObject
{
    public readonly type: 'CountryI18NId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}