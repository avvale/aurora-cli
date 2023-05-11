import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectParams extends JsonValueObject
{
    public readonly type: string = 'SideEffectParams';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectParams',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}