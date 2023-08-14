import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantIsActive extends BooleanValueObject
{
    public readonly type: string = 'IamTenantIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamTenantIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}