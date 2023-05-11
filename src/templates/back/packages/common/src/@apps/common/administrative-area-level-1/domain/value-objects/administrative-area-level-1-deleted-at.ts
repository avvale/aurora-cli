import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel1DeletedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel1DeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1DeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}