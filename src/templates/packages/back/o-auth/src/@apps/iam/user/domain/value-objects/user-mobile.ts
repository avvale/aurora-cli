import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class UserMobile extends StringValueObject
{
    public readonly type: 'UserMobile';

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