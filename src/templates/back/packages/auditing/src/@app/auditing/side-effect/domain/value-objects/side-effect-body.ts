import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectBody extends JsonValueObject
{
    public readonly type: string = 'SideEffectBody';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectBody',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}