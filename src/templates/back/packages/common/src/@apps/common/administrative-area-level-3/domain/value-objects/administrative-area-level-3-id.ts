import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel3Id extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3Id',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}