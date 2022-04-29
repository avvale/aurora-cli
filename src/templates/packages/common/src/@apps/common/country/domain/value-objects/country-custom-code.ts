import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryCustomCode extends StringValueObject
{
    public readonly type: 'CountryCustomCode';

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