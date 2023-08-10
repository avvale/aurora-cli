import { BlobValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantLogo extends BlobValueObject
{
    public readonly type: string = 'IamTenantLogo';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamTenantLogo',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}