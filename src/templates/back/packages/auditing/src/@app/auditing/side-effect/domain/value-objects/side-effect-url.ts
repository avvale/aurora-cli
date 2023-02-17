import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectUrl extends StringValueObject
{
    public readonly type: 'SideEffectUrl';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectUrl',
            nullable   : true,
            undefinable: true,
            maxLength  : 2048,
        }, validationRules));
    }
}