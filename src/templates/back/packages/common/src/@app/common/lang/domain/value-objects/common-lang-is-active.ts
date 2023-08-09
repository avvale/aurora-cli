import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangIsActive extends BooleanValueObject
{
    public readonly type: string = 'CommonLangIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}