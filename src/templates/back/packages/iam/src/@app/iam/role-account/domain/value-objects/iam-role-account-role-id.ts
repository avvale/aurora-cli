import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamRoleAccountRoleId extends UuidValueObject
{
    public readonly type: string = 'IamRoleAccountRoleId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamRoleAccountRoleId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}