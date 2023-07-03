import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3DeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel3DeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3DeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}