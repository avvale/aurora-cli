import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel3UpdatedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel3UpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3UpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}