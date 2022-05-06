import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class BoundedContextName extends StringValueObject
{
    public readonly type: 'BoundedContextName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}