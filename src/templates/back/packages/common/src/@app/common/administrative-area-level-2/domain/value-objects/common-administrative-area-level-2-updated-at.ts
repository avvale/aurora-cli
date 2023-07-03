import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2UpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel2UpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2UpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}