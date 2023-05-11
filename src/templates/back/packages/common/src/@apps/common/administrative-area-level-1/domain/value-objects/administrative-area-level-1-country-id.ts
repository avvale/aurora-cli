import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel1CountryId extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel1CountryId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1CountryId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}