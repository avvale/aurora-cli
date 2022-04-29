import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

export class UserData extends JsonValueObject
{
    public readonly type: 'UserData';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserData',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}