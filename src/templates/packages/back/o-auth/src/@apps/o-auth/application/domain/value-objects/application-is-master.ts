import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class ApplicationIsMaster extends BooleanValueObject
{
    public readonly type: 'ApplicationIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationIsMaster',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}