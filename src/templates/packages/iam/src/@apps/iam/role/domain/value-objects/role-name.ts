import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class RoleName extends StringValueObject
{
    public readonly type: 'RoleName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RoleName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}