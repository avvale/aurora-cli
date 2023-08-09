import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3Slug extends StringValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel3Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel3Slug',
            nullable   : false,
            undefinable: false,
            maxLength  : 100,
        }, validationRules));
    }
}