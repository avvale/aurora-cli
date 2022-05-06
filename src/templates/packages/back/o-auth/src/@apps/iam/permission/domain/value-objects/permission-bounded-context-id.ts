import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class PermissionBoundedContextId extends UuidValueObject
{
    public readonly type: 'PermissionBoundedContextId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionBoundedContextId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}