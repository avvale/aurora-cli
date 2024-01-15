import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamBoundedContextSort extends SmallintValueObject
{
    public readonly type: string = 'IamBoundedContextSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamBoundedContextSort',
            nullable   : true,
            undefinable: true,
            unsigned   : true,
        }, validationRules));
    }
}