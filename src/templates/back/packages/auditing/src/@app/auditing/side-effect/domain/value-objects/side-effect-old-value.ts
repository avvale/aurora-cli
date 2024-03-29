import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectOldValue extends JsonValueObject
{
    public readonly type: string = 'SideEffectOldValue';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectOldValue',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}