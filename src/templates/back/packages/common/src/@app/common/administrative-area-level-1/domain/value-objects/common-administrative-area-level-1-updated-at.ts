import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1UpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel1UpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1UpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}