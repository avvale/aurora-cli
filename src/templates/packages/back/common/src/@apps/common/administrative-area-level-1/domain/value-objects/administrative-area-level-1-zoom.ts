import { IntValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel1Zoom extends IntValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Zoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Zoom',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}