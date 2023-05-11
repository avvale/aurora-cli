import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RoleRoleId extends UuidValueObject
{
    public readonly type: 'RoleRoleId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleRoleId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}