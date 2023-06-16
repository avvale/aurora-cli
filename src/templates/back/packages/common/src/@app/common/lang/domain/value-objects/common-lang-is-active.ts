import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangIsActive extends BooleanValueObject
{
    public readonly type: string = 'LangIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'LangIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}