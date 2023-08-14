import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3MapType extends EnumValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel3MapType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel3MapType',
            nullable   : false,
            undefinable: false,
            enumOptions: ['ROADMAP','SATELLITE','HYBRID','TERRAIN'],
        }, validationRules));
    }
}