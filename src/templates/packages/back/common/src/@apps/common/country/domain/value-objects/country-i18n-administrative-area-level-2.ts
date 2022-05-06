import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryI18NAdministrativeAreaLevel2 extends StringValueObject
{
    public readonly type: 'CountryI18NAdministrativeAreaLevel2';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NAdministrativeAreaLevel2',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}