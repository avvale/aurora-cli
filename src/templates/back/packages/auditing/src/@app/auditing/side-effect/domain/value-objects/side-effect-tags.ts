import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectTags extends JsonValueObject
{
    public readonly type: string = 'SideEffectTags';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectTags',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}