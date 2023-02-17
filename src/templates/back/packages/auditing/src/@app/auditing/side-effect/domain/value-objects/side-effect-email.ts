import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectEmail extends StringValueObject
{
    public readonly type: string = 'SideEffectEmail';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectEmail',
            nullable   : false,
            undefinable: false,
            maxLength  : 120,
        }, validationRules));
    }
}