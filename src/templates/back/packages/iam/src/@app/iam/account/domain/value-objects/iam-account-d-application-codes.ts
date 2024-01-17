import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountDApplicationCodes extends JsonValueObject
{
    public readonly type: string = 'IamAccountDApplicationCodes';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamAccountDApplicationCodes',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}