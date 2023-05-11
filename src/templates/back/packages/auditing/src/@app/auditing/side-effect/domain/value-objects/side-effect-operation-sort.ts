import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectOperationSort extends IntValueObject
{
    public readonly type: string = 'SideEffectOperationSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectOperationSort',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}