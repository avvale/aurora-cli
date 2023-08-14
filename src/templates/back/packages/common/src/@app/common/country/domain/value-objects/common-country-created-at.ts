import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonCountryCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountryCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}