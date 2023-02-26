import { SmallintValueObject, ValidationRules } from '@aurora-ts/core';

export class BoundedContextSort extends SmallintValueObject
{
    public readonly type: string = 'BoundedContextSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextSort',
            nullable   : true,
            undefinable: true,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}