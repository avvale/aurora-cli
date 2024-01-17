import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountDTenants extends JsonValueObject
{
    public readonly type: string = 'IamAccountDTenants';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamAccountDTenants',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}