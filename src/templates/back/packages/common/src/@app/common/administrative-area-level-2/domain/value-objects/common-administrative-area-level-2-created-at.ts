import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2CreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel2CreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2CreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}