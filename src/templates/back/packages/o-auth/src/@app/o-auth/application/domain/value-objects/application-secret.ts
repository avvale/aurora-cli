import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class ApplicationSecret extends StringValueObject
{
    public readonly type: string = 'ApplicationSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationSecret',
            nullable   : false,
            undefinable: false,
            maxLength  : 90,
        }, validationRules));
    }
}