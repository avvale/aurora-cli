import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nAdministrativeAreaLevel1 extends StringValueObject
{
    public readonly type: string = 'CommonCountryI18nAdministrativeAreaLevel1';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountryI18nAdministrativeAreaLevel1',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}