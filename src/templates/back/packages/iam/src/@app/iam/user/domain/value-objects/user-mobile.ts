import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserMobile extends StringValueObject
{
    public readonly type: string = 'UserMobile';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserMobile',
            nullable   : true,
            undefinable: true,
            maxLength  : 60,
        }, validationRules));
    }
}