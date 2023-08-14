import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2DeletedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel2DeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel2DeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}