import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantId extends UuidValueObject
{
    public readonly type: string = 'IamTenantId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamTenantId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}