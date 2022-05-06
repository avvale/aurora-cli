import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class ScopeCode extends StringValueObject
{
    public readonly type: 'ScopeCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ScopeCode',
            nullable   : false,
            undefinable: false,
            maxLength  : 20,
        }, validationRules));
    }
}