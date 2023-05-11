import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel1UpdatedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel1UpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1UpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}