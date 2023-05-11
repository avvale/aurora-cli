import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryCreatedAt extends TimestampValueObject
{
    public readonly type: 'CountryCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}