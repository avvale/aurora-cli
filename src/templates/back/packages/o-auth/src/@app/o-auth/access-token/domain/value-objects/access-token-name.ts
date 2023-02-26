import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class AccessTokenName extends StringValueObject
{
    public readonly type: string = 'AccessTokenName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenName',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}