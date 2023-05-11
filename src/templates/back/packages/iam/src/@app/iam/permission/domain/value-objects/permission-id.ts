import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class PermissionId extends UuidValueObject
{
    public readonly type: string = 'PermissionId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}