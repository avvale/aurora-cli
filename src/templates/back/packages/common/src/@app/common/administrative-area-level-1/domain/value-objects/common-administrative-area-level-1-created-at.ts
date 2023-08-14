import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1CreatedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1CreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1CreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}