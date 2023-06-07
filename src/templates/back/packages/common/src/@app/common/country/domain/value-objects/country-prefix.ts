import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryPrefix extends StringValueObject
{
    public readonly type: string = 'CountryPrefix';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryPrefix',
            nullable   : true,
            undefinable: true,
            maxLength  : 5,
        }, validationRules));
    }
}