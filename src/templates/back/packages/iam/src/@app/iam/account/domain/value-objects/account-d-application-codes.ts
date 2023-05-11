import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountDApplicationCodes extends JsonValueObject
{
    public readonly type: string = 'AccountDApplicationCodes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountDApplicationCodes',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}