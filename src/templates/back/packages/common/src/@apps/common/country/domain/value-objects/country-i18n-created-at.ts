import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18NCreatedAt extends TimestampValueObject
{
    public readonly type: 'CountryI18NCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}