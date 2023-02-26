import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurora-ts/core';

export class BoundedContextIsActive extends BooleanValueObject
{
    public readonly type: string = 'BoundedContextIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}