import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2Slug extends StringValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel2Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel2Slug',
            nullable   : false,
            undefinable: false,
            maxLength  : 100,
        }, validationRules));
    }
}