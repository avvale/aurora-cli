import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class PermissionName extends StringValueObject
{
    public readonly type: string = 'PermissionName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'PermissionName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}