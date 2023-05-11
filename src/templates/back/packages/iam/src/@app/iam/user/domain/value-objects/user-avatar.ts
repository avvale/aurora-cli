import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserAvatar extends StringValueObject
{
    public readonly type: string = 'UserAvatar';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserAvatar',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}