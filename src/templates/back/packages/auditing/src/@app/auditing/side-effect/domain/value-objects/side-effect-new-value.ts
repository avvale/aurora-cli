import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectNewValue extends JsonValueObject
{
    public readonly type: string = 'SideEffectNewValue';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectNewValue',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}