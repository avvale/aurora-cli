import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2AdministrativeAreaLevel1Id extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel2AdministrativeAreaLevel1Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2AdministrativeAreaLevel1Id',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}