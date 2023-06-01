import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18nDeletedAt extends TimestampValueObject
{
    public readonly type: 'CountryI18nDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}