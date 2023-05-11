import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel3CountryId extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel3CountryId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3CountryId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}