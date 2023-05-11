import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel3AdministrativeAreaLevel2Id extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel3AdministrativeAreaLevel2Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3AdministrativeAreaLevel2Id',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}