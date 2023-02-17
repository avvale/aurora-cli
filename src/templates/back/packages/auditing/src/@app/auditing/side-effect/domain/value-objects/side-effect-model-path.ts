import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectModelPath extends StringValueObject
{
    public readonly type: string = 'SideEffectModelPath';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectModelPath',
            nullable   : false,
            undefinable: false,
            maxLength  : 1023,
        }, validationRules));
    }
}