import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

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