import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectBaseUrl extends StringValueObject
{
    public readonly type: string = 'SideEffectBaseUrl';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectBaseUrl',
            nullable   : true,
            undefinable: true,
            maxLength  : 2047,
        }, validationRules));
    }
}