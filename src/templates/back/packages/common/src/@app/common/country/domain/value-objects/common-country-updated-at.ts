import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'CountryUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}