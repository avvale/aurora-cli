import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2CreatedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel2CreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2CreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}