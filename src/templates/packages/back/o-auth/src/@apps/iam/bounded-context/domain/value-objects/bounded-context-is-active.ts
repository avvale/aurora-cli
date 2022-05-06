import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class BoundedContextIsActive extends BooleanValueObject
{
    public readonly type: 'BoundedContextIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}