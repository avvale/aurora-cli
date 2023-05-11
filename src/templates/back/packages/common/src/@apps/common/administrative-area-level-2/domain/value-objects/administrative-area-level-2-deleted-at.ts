import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2DeletedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel2DeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2DeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}