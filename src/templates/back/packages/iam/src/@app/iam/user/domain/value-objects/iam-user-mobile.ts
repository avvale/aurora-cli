import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserMobile extends StringValueObject
{
    public readonly type: string = 'IamUserMobile';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamUserMobile',
            nullable   : true,
            undefinable: true,
            maxLength  : 63,
        }, validationRules));
    }
}