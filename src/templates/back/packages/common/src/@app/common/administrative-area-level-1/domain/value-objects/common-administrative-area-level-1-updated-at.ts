import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1UpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1UpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1UpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}