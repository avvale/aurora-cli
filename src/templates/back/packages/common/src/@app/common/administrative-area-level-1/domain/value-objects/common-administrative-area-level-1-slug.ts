import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Slug extends StringValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1Slug',
            nullable   : false,
            undefinable: false,
            maxLength  : 100,
        }, validationRules));
    }
}