import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectQuery extends JsonValueObject
{
    public readonly type: string = 'SideEffectQuery';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectQuery',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}