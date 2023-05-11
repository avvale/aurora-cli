import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel1CreatedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel1CreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1CreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}