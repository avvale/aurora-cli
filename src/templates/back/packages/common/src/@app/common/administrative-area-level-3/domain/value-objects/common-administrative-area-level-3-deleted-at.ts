import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3DeletedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel3DeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel3DeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}