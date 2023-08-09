import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangSort extends SmallintValueObject
{
    public readonly type: string = 'CommonLangSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangSort',
            nullable   : true,
            undefinable: true,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}