import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class ApplicationCode extends StringValueObject
{
    public readonly type: 'ApplicationCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationCode',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}