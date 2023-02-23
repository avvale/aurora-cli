import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class AdministrativeAreaLevel3Slug extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3Slug',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}