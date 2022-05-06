import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel1Slug extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Slug',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}