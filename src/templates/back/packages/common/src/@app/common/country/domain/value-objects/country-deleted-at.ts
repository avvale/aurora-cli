import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'CountryDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}