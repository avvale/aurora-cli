import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class ClientIsActive extends BooleanValueObject
{
    public readonly type: 'ClientIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}