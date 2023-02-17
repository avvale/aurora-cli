import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectUserAgent extends StringValueObject
{
    public readonly type: string = 'SideEffectUserAgent';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectUserAgent',
            nullable   : true,
            undefinable: true,
            maxLength  : 1023,
        }, validationRules));
    }
}