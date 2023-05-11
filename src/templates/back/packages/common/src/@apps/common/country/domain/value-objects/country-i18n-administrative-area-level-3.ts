import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18NAdministrativeAreaLevel3 extends StringValueObject
{
    public readonly type: 'CountryI18NAdministrativeAreaLevel3';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NAdministrativeAreaLevel3',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}