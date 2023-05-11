import { BooleanValueObject, ValidationRules } from '@aurorajs.dev/core';

export class LangIsActive extends BooleanValueObject
{
    public readonly type: 'LangIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}