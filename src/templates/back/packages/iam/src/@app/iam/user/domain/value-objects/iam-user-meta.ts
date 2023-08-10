import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserMeta extends JsonValueObject
{
    public readonly type: string = 'IamUserMeta';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamUserMeta',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}