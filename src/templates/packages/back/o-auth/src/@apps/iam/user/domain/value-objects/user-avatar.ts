import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class UserAvatar extends StringValueObject
{
    public readonly type: 'UserAvatar';

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