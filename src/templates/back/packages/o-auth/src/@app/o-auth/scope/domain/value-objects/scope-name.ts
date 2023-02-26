import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class ScopeName extends StringValueObject
{
    public readonly type: string = 'ScopeName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ScopeName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}