import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class BoundedContextRoot extends StringValueObject
{
    public readonly type: 'BoundedContextRoot';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextRoot',
            nullable   : false,
            undefinable: false,
            maxLength  : 30,
        }, validationRules));
    }
}