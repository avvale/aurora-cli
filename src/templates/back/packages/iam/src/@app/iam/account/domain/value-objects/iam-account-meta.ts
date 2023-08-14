import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountMeta extends JsonValueObject
{
    public readonly type: string = 'IamAccountMeta';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamAccountMeta',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}