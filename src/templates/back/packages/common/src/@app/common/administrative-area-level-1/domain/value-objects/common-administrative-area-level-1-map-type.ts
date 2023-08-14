import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1MapType extends EnumValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1MapType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1MapType',
            nullable   : false,
            undefinable: false,
            enumOptions: ['ROADMAP','SATELLITE','HYBRID','TERRAIN'],
        }, validationRules));
    }
}