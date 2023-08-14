import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonCountryUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountryUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}