import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryCustomCode extends StringValueObject
{
    public readonly type: string = 'CountryCustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryCustomCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
        }, validationRules));
    }
}