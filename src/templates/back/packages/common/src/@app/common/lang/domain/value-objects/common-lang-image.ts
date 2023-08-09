import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangImage extends StringValueObject
{
    public readonly type: string = 'CommonLangImage';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangImage',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}