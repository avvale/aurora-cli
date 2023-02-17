import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectModelName extends StringValueObject
{
    public readonly type: string = 'SideEffectModelName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectModelName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}