import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class LangImage extends StringValueObject
{
    public readonly type: 'LangImage';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangImage',
            nullable   : true,
            undefinable: true,
            
        }, validationRules));
    }
}